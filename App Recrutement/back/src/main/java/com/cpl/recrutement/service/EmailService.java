package com.cpl.recrutement.service;

import com.cpl.recrutement.entities.Customer;
import com.cpl.recrutement.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.util.Properties;


@Service
public class EmailService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private StorageService storageService;
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /*public void sendEmail(String to, String subject, String text ) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }*/



    @Async
    public void sendEmailWithAttachment(String to, String subject, String text, String filePath) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text);

            FileSystemResource file = new FileSystemResource(new File(filePath));
            helper.addAttachment(file.getFilename(), file);

            mailSender.send(message);
        } catch (MessagingException e) {
            // Handle the exception here or rethrow it as needed
            throw new RuntimeException("Failed to send email with attachment.", e);
        }
    }
    public Customer updateProfileImage(Long userId, MultipartFile image) {
        String filename = storageService.CreateNameCv(image);
        Customer customer = customerRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

   storageService.store(image , filename);
        customer.setCv(filename);

        return customerRepository.save(customer);
    }


    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text + " Your verification code is: " );
        mailSender.send(message);
    }

}
