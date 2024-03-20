package com.bna.ebanking.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.*;
import java.util.Date;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "candidat")
public class Candidat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "email")
    private String email;

    @Column(name = "entretientel")
    private Date entretientel;

    @Column(name = "entretienphy")
    private Date entretienphy;

    @Column(name = "evaluation")
    private String evaluation;


    @Column(name = "parrainage")
    private String parrainage;

    @Column(name = "sourcing ")
    private String sourcing ;









}
