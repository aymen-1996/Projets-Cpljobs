package com.cpl.jobs.entities;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "post")
public class Post {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date date ;


    @ManyToOne()
    @JoinColumn(name = "id_infocan")
    private Infocan infocan;


    @ManyToOne()
    @JoinColumn(name = "id_infopro")
    private Infopro infopro;


    @ManyToOne()
    @JoinColumn(name = "id_annonce")
    private Annonce annonce;
}
