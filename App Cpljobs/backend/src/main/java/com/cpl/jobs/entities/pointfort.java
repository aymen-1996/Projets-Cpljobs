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
@Table(name = "ptfort")
public class pointfort {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pointfort")
    private String pointFort;

    @Column(name = "interet")
    private String interet;

    @ManyToOne()
    @JoinColumn(name = "id_user")
    private User user;

}
