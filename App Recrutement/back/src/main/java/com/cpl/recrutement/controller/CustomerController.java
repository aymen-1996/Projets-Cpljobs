package com.cpl.recrutement.controller;

import com.cpl.recrutement.entities.Customer;
import com.cpl.recrutement.exceptions.ResourceNotFoundException;
import com.cpl.recrutement.repositories.CustomerRepository;
import com.cpl.recrutement.service.EmailService;
import com.cpl.recrutement.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;


@CrossOrigin("http://localhost:4200")
@RestController

public class CustomerController {

    @Autowired
    private EmailService emailService;
    @Autowired
    private StorageService storage;

    @Autowired
    private CustomerRepository customerRepository;
    // Constructor injection



    @GetMapping("/customers")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        try {
            List<Customer> customers = customerRepository.findAll();
            return ResponseEntity.ok(customers);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storage.loadFile(filename);

        if (file.exists()) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                    .body(file);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found");
        }
    }
    private List<Customer> getCustomers() {
        return customerRepository.findAll();
    }

    @PostMapping("/customers")
    public Customer save(@RequestParam("file") MultipartFile file, Customer customer) {
        try {
            if (file != null && !file.isEmpty()) {
                String filename = storage.CreateNameCv(file);
                storage.store(file, filename);
                customer.setCv(filename);

                return customerRepository.save(customer);

            } else {
                throw new IllegalArgumentException("Le fichier n'est pas présent ou est vide.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Une erreur s'est produite lors de la sauvegarde du candidat.");
        }

    }



    // build delete employee REST API
    @DeleteMapping("/customers/{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable Long id) {
        try {
            Optional<Customer> optionalCustomer = customerRepository.findById(id);
            if (optionalCustomer.isPresent()) {
                Customer customer = optionalCustomer.get();
                customerRepository.delete(customer);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                throw new ResourceNotFoundException("Customer does not exist with id: " + id);
            }
        } catch (ResourceNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/customers/search")
    public List<Customer> searchCust(@RequestParam("keyword") String keyword,
                                     @RequestParam("minAge") Long minAge,
                                     @RequestParam("maxAge") Long maxAge) {
        return customerRepository.searchCustomers("%"+keyword+"%", minAge, maxAge);
    }

    @GetMapping("/customers/{id}")
    public ResponseEntity<Customer> findById(@PathVariable Long id) {
        try {
            Optional<Customer> optionalCustomer = customerRepository.findById(id);
            if (optionalCustomer.isPresent()) {
                Customer customer = optionalCustomer.get();
                return ResponseEntity.ok(customer);
            } else {
                throw new ResourceNotFoundException("Customer not found with id: " + id);
            }
        } catch (ResourceNotFoundException e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/customers/{id}")
    public Customer update(@RequestBody Customer customer, @PathVariable Long id) {
        try {
            customer.setId(id);
            Optional<Customer> optionalOldCustomer = customerRepository.findById(id);
            if (optionalOldCustomer.isPresent()) {
                Customer oldCustomer = optionalOldCustomer.get();

                customer.setNom(customer.getNom() == null ? oldCustomer.getNom() : customer.getNom());
                customer.setRegion(customer.getRegion() == null ? oldCustomer.getRegion() : customer.getRegion());
                customer.setEmail(customer.getEmail() == null ? oldCustomer.getEmail() : customer.getEmail());
                customer.setSecteur(customer.getSecteur() == null ? oldCustomer.getSecteur() : customer.getSecteur());
                customer.setEtude(customer.getEtude() == null ? oldCustomer.getEtude() : customer.getEtude());
                customer.setAnneeExperience(customer.getAnneeExperience() == null ? oldCustomer.getAnneeExperience() : customer.getAnneeExperience());
                customer.setCv(oldCustomer.getCv());
                customer.setTelephone(customer.getTelephone() == null ? oldCustomer.getTelephone() : customer.getTelephone());

                return customerRepository.save(customer);
            } else {
                throw new ResourceNotFoundException("Customer does not exist with id: " + id);
            }
        } catch (ResourceNotFoundException e) {
            // Gérer l'exception de ressource non trouvée ici
            e.printStackTrace();
            throw e;
        } catch (Exception e) {
            // Gérer les autres exceptions ici
            e.printStackTrace();
            throw new RuntimeException("Une erreur s'est produite lors de la mise à jour du client.");
        }
    }

    @PutMapping("/{userId}/image")
    public ResponseEntity<Customer> updateProfileImage(
            @PathVariable Long userId,
            @RequestParam("image") MultipartFile image) {
        try {
            if (image != null && !image.isEmpty()) {
                Customer updatedUser = emailService.updateProfileImage(userId, image);
                return ResponseEntity.ok(updatedUser);
            } else {
                throw new IllegalArgumentException("L'image n'est pas présente ou est vide.");
            }
        } catch (IllegalArgumentException e) {
            // Gérez l'exception ici en effectuant une action appropriée
            e.printStackTrace(); // Affichez la trace de la pile pour le débogage
            return ResponseEntity.badRequest().build(); // Retournez une réponse d'erreur appropriée
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/search1")
    public List<Customer> searchCustomers1(
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "minAge", required = false) Long minAge,
            @RequestParam(value = "maxAge", required = false) Long maxAge,
            @RequestParam(value = "secteur", required = false) String secteur,
            @RequestParam(value = "region", required = false) String region
    ) {
        String formattedKeyword = keyword != null ? "%" + keyword + "%" : keyword;
        String formattedKeyword1 = secteur != null ? "%" + secteur + "%" : secteur;
        String formattedKeyword2 = region != null ? "%" + region + "%" : region;
        return customerRepository.searchCustomers2(formattedKeyword, minAge, maxAge,formattedKeyword1,formattedKeyword2);
    }

}



