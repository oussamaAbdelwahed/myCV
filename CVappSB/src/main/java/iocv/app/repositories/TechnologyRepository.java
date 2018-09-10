package iocv.app.repositories;

import iocv.app.beans.Technology;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface TechnologyRepository extends JpaRepository<Technology, Long> {
    @Modifying
    @Transactional
    @Query("UPDATE Technology t SET t.name = :name, t.level = :level,t.technology = :technology WHERE t.id = :id")
    public void updateTechnology(@Param("name") String name, @Param("level") byte level, @Param("technology") byte[] technology, @Param("id") Long id);

    @Modifying
    @Transactional
    @Query("UPDATE Technology t SET t.name = :name, t.level = :level WHERE t.id = :id")
    public void updateTechnologyPlainText(@Param("name") String name, @Param("level") byte level, @Param("id") Long id);
}
