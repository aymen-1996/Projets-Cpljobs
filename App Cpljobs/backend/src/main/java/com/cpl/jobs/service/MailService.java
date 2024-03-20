package com.cpl.jobs.service;


import com.cpl.jobs.entities.Contact;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class MailService {






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

        public String sendMailWithAttachmentAndCalendar(String recipient, String msgBody, String subject) {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper;

            try {
                mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
                mimeMessageHelper.setFrom(sender);
                mimeMessageHelper.setTo(recipient);
                mimeMessageHelper.setText(msgBody);
                mimeMessageHelper.setSubject(subject);

                // Adding the attachment

                // Adding the calendar event

                // Sending the mail
                javaMailSender.send(mimeMessage);
                return "Mail sent Successfully";
            } catch (MessagingException e) {
                return "Error while sending mail!!!";
            }
        }





        @Async
    public String sendSimpleMail(Contact contact) {
        // Try block to check for exceptions
        try {
            // Creating a simple mail message
            SimpleMailMessage mailMessage = new SimpleMailMessage();

            // Setting up necessary details
            mailMessage.setFrom(sender);
            mailMessage.setTo("chouaibiaymen03@gmail.com");
            mailMessage.setText("Bonjour, je m'appelle " + contact.getNom() + "\n"+ contact.getTelephone() + "\n"  + contact.getMsgBody() + "\n Mon email est " + contact.getEmail()); /* contenu mail */
            mailMessage.setSubject(contact.getSubject()); /* titre mail */

            // Sending the mail
            javaMailSender.send(mailMessage);
        } catch (Exception e) {
            // You might want to handle the exception here, or you can throw a new exception if needed
            throw new RuntimeException(e);
        }
        return "mail success";
    }





}

