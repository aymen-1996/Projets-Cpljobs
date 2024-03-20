package com.cpl.jobs.service;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.UUID;

@Service
public class StorageService {
    private final Path rootLocation = Paths.get("upload-dir");

    public String CreateNameCv(MultipartFile file) {

        try {
            int i = (int) new Date().getTime();
            System.out.println("Integer : " + i);

            String ch = Integer.toString(i);
            String fileName = ch.substring(0, ch.length() - 1);
            String ext = file.getOriginalFilename().substring(file.getOriginalFilename().indexOf('.'), file.getOriginalFilename().length());
            String name = file.getOriginalFilename().substring(0, file.getOriginalFilename().indexOf('.'));
            String original = name + fileName + ext;
            return original;
        } catch (Exception e) {
            throw new RuntimeException("FAIL!");
        }

    }
    public String CreateNameImage(MultipartFile imageFile) {
        String originalFilename = imageFile.getOriginalFilename();
        String extension = extractFileExtension(originalFilename);
        String uniqueFilename = generateUniqueFilename();
        return uniqueFilename + extension;
    }
    private String extractFileExtension(String filename) {
        int extensionIndex = filename.lastIndexOf(".");
        if (extensionIndex >= 0 && extensionIndex < filename.length() - 1) {
            return filename.substring(extensionIndex);
        }
        return "";
    }

    private String generateUniqueFilename() {
        // Generate a unique filename using a combination of timestamp and random characters
        String timestamp = String.valueOf(System.currentTimeMillis());
        String randomString = UUID.randomUUID().toString().replaceAll("-", "");
        return timestamp + "_" + randomString;
    }








    public void store(MultipartFile file, String original) {
        try {

            Files.copy(file.getInputStream(), this.rootLocation.resolve(original));
        } catch (Exception e) {
            throw new RuntimeException("FAIL!");
        }
    }

    public Resource loadFile(String filename) {
        try {
            Path file = rootLocation.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("FAIL!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("FAIL!");
        }
    }


    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }


    //@EventListener(ApplicationReadyEvent.class)
    public void init() {
        try {
            Files.createDirectory(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage!");
        }
    }
}