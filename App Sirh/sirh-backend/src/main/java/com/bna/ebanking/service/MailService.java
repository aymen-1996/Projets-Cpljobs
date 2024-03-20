package com.bna.ebanking.service;

import com.bna.ebanking.repositories.PaieRepository;
import com.sun.istack.ByteArrayDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;
    @Service
    @Async
    public class MailService {




        @Autowired
        private PaieRepository paieRepository;

        @Autowired
        private StorageService storageService;

        @Autowired
        private JavaMailSender javaMailSender;

        @Value("${spring.mail.username}")
        private String sender;


        // Method 1
        // To send a simple email
        public String sendSimpleMail(String recipient , String msgBody , String subject ) {

            // Try block to check for exceptions
            try {

                // Creating a simple mail message
                SimpleMailMessage mailMessage
                        = new SimpleMailMessage();

                // Setting up necessary details
                mailMessage.setFrom(sender);
                mailMessage.setTo(recipient);
                mailMessage.setText(msgBody);
                mailMessage.setSubject(subject);


                // Sending the mail
                javaMailSender.send(mailMessage);
                return "Mail Sent Successfully...";
            }

            // Catch block to handle the exceptions
            catch (Exception e) {
                //return "Error while Sending Mail";
                throw new RuntimeException(e);
            }
        }

        public String sendMailWithAttachmentAndCalendar(String recipient, String msgBody, String subject , String filePath) {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper;

            try {
                mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
                mimeMessageHelper.setFrom(sender);
                mimeMessageHelper.setTo(recipient);
                mimeMessageHelper.setText(msgBody);
                mimeMessageHelper.setSubject(subject);
                FileSystemResource file = new FileSystemResource(new File(filePath));
                mimeMessageHelper.addAttachment(file.getFilename(), file);

                // Adding the attachment

                // Adding the calendar event

                // Sending the mail
                javaMailSender.send(mimeMessage);
                return "Mail sent Successfully";
            } catch (MessagingException e) {
                return "Error while sending mail!!!";
            }
        }




    }


