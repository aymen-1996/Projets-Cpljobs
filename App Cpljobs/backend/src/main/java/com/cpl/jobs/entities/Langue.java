package com.cpl.jobs.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "langue")
public class Langue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "langues")
    private String langues;

    @Column(name = "niveau")
    private String niveau;

    @Column(name = "certificat")
    private String certificat;

    @Column(name = "score")
    private String score;

    @ManyToOne()
    @JoinColumn(name = "id_user")
    private User user;

}
