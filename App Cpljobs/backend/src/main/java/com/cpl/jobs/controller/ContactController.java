package com.cpl.jobs.controller;

import com.cpl.jobs.entities.Contact;
import com.cpl.jobs.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class ContactController {



    @Autowired
    private MailService mailService;

    // Sending a simple Email
    @PostMapping("/sendMail")
    public void
    sendMail(@RequestBody Contact contact)
    {

        Thread thread = new Thread(() -> {
            mailService.sendSimpleMail(contact);
        });

        thread.start();
    }


}
