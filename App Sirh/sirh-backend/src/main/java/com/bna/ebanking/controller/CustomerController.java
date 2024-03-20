package com.bna.ebanking.controller;

import com.bna.ebanking.entities.Candidat;
import com.bna.ebanking.entities.Customer;

import com.bna.ebanking.exceptions.ResourceNotFoundException;
import com.bna.ebanking.repositories.CustomerRepository;
import com.bna.ebanking.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;


@CrossOrigin("http://localhost:4200")
@RestController

public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private StorageService storage;




    @GetMapping("/customers")
    public List<Customer> getAllEmployees(){
        return customerRepository.findAll();
    }


    @GetMapping("/customers/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storage.loadFile(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @GetMapping("/customers/search")
    public List<Customer> searchCustomers(@RequestParam(name = "keyword",defaultValue = "") String keyword){
        return customerRepository.searchCustomers("%"+keyword+"%");
    }

   @PostMapping("/customers")
    public Customer save(@RequestParam("file") MultipartFile file, Customer customer) {
        String filename = storage.CreateNameCv(file);
        storage.store(file, filename);
        customer.setCv(filename);
        return customerRepository.save(customer);
    }


    @DeleteMapping("/customers/{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable Long id){

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not exist with id: " + id));

        customerRepository.delete(customer);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
    @PutMapping("/customers/{id}")
    public Customer update(@PathVariable Long id, @RequestBody Customer customer) {
        customer.setId(id);
        Customer oldCustomer = customerRepository.findById(id).orElse(null);
        customer.setNom(customer.getNom() == null ? oldCustomer.getNom() : customer.getNom());
        customer.setPrenom(customer.getPrenom() == null ? oldCustomer.getPrenom() : customer.getPrenom());
        customer.setEtude(customer.getEtude() == null ? oldCustomer.getEtude() : customer.getEtude());
        customer.setEmail(customer.getEmail() == null ? oldCustomer.getEmail() : customer.getEmail());
        customer.setSecteur(customer.getSecteur() == null ? oldCustomer.getSecteur() : customer.getSecteur());
        customer.setCv(oldCustomer.getCv());


        return customerRepository.save(customer);
    }

    @GetMapping("/customers/{id}")
    public Customer findById(@PathVariable Long id){
        return customerRepository.findById(id).orElse(null);
    }


}



