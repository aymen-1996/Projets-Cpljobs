package com.cpl.jobs.controller;


import com.cpl.jobs.entities.Annonce;


import com.cpl.jobs.entities.Document;
import com.cpl.jobs.entities.User;
import com.cpl.jobs.repositories.AnnonceRepository;

import com.cpl.jobs.repositories.UserRepository;
import com.cpl.jobs.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.core.io.Resource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.text.SimpleDateFormat;
import java.util.*;


@RestController

@CrossOrigin("*")


public class AnnonceController {
    @Autowired
    private AnnonceRepository annonceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StorageService storage;



    @GetMapping("/annonce")
    public List<Annonce> findall() {
        return annonceRepository.findAll();
    }

    @GetMapping("/annonce/{id}")
    public Annonce findByid(@PathVariable Long id) {
        return annonceRepository.findById(id).orElse(null);
    }



    @GetMapping("/annonce/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storage.loadFile(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }


    @PostMapping("/annonce/{id_user}")
    public Annonce save(@RequestParam(name = "file", required = false) MultipartFile imageFile, Annonce annonce, @PathVariable Long id_user) {
        annonce.setDate(new Date());
        annonce.setStatut("en ligne");

        if (imageFile != null && !imageFile.isEmpty()) {
            String cvFilename = storage.CreateNameCv(imageFile);
            storage.store(imageFile, cvFilename);
            annonce.setImage(cvFilename);
        }

        User user = userRepository.findById(id_user).orElse(null);
        annonce.setUser(user);
        return annonceRepository.save(annonce);
    }




    @DeleteMapping("/annonce/{id}")
    public void delete(@PathVariable Long id) {
        annonceRepository.deleteById(id);
    }

    @PutMapping("/annonce/{id}")
    public Annonce update(@PathVariable Long id, @RequestBody Annonce annonce) {
        annonce.setId(id);
        Annonce oldAnn = annonceRepository.findById(id).orElse(null);

        return annonceRepository.save(annonce);
    }




    @GetMapping("/annonce/search")
    public List<Annonce> searchAnnonce(
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "secteur", required = false) String secteur,
            @RequestParam(value = "region", required = false) String region
    ) {
        String formattedKeyword = keyword != null ? "%" + keyword + "%" : keyword;
        String formattedKeyword1 = secteur != null ? "%" + secteur + "%" : secteur;
        String formattedKeyword2 = region != null ? "%" + region + "%" : region;
        return annonceRepository.searchAnnonce(formattedKeyword, formattedKeyword1, formattedKeyword2);
    }



    @GetMapping("/annonce/search1")
    public List<Annonce> searchAnnonce1(
            @RequestParam(value = "keyword", required = false) String keyword,

            @RequestParam(value = "region", required = false) String region
    ) {
        String formattedKeyword = keyword != null ? "%" + keyword + "%" : keyword;

        String formattedKeyword2 = region != null ? "%" + region + "%" : region;
        return annonceRepository.searchAnnonce1(formattedKeyword, formattedKeyword2);
    }





    @GetMapping("/annonces/{id_user}")
    public List<Annonce> annonces(@PathVariable Long id_user) {
        return annonceRepository.findann(id_user);
    }

    @GetMapping("/annoncesParJourSemaine/{userId}")
    public Map<String, Map<String, Long>> getNombreAnnoncesParJourSemaine(@PathVariable Long userId, @RequestParam(value = "startDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate
    ) {
        Map<String, Map<String, Long>> statistiquesParUtilisateur = new HashMap<>();

        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            User utilisateur = optionalUser.get();
            Map<String, Long> annoncesParJour = new LinkedHashMap<>();

            if (startDate == null) {

                startDate = new Date();
            }

            Calendar calendar = Calendar.getInstance();
            calendar.setTime(startDate);
            calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
            startDate = calendar.getTime();

            calendar.add(Calendar.DAY_OF_MONTH, 7);

            Date endDate = calendar.getTime();

            while (startDate.before(endDate)) {
                long count = annonceRepository.countAnnoncesCreatedOnDateByUser(startDate, userId);
                annoncesParJour.put(getDayOfWeek(startDate), count);

                calendar.setTime(startDate);
                calendar.add(Calendar.DAY_OF_WEEK, 1);
                startDate = calendar.getTime();
            }

            statistiquesParUtilisateur.put(utilisateur.getNom(), annoncesParJour);
        } else {

        }

        return statistiquesParUtilisateur;
    }


    private String getDayOfWeek(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);

        switch (dayOfWeek) {
            case Calendar.MONDAY:
                return "Lundi";
            case Calendar.TUESDAY:
                return "Mardi";
            case Calendar.WEDNESDAY:
                return "Mercredi";
            case Calendar.THURSDAY:
                return "Jeudi";
            case Calendar.FRIDAY:
                return "Vendredi";
            case Calendar.SATURDAY:
                return "Samedi";
            case Calendar.SUNDAY:
                return "Dimanche";
            default:
                return "";
        }
    }

    @GetMapping("/annoncesParAnnee/{userId}")
    public Map<Integer, Map<String, Long>> getNombreAnnoncesParAnnee(@PathVariable Long userId,
                                                                     @RequestParam(value = "year", required = false) Integer year) {

        Map<Integer, Map<String, Long>> statistiquesParUtilisateur = new HashMap<>();

        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            User utilisateur = optionalUser.get();
            Map<String, Long> annoncesParMois = new LinkedHashMap<>();

            Calendar calendar = Calendar.getInstance();
            if (year == null) {
                year = calendar.get(Calendar.YEAR);
            }

            for (int month = Calendar.JANUARY; month <= Calendar.DECEMBER; month++) {
                calendar.set(year, month, 1, 0, 0, 0);
                calendar.set(Calendar.MILLISECOND, 0);
                Date startDate = calendar.getTime();

                calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
                calendar.set(Calendar.HOUR_OF_DAY, 23);
                calendar.set(Calendar.MINUTE, 59);
                calendar.set(Calendar.SECOND, 59);
                Date endDate = calendar.getTime();

                long count = annonceRepository.countAnnoncesCreatedBetweenDatesByUser(startDate, endDate, userId);
                annoncesParMois.put(new SimpleDateFormat("MMMM", Locale.FRANCE).format(startDate), count);
            }

            statistiquesParUtilisateur.put(year, annoncesParMois);
        }

        return statistiquesParUtilisateur;
    }



}