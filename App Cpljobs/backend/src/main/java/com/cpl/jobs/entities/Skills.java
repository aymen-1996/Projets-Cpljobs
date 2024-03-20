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
@Table(name = "skills")
public class Skills {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "competence")
    private String competence;

    @Column(name = "niveau")
    private String niveau;

    @Column(name = "description")
    private String description;


    @ManyToOne()
    @JoinColumn(name = "id_user")
    private User user;
}
