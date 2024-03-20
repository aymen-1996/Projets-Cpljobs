package com.bna.ebanking.repositories;


import com.bna.ebanking.entities.Info;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InfoRepository extends JpaRepository<Info, Long> {


    @Query("select i from Info i where i.dateEmbauche like :kw  or i.nom like :kw or i.dateDepart like :kw or CAST(i.cnss AS string)like :kw or CAST(i.rib AS string)like :kw")
    List<Info> searchInfos(@Param("kw") String keyword);
}
