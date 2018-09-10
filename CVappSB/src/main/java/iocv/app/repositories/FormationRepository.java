package iocv.app.repositories;

import iocv.app.beans.Formation;
import iocv.app.common.FormationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface FormationRepository extends JpaRepository<Formation,Long> {

    List<Formation> findAllByType(FormationType type);
    @Modifying
    @Transactional
    @Query("UPDATE Formation f SET f.type = :type, f.description = :description, f.proofDocument = :proofDocument WHERE f.id = :id")
    void updateFormation(@Param("type") FormationType type,@Param("description") String description,@Param("proofDocument") byte[] proofDocument, @Param("id") Long id);

    @Modifying
    @Transactional
    @Query("UPDATE Formation f SET f.type = :type, f.description = :description WHERE f.id = :id")
    void updateFormationPlainText(@Param("type") FormationType type,@Param("description") String description, @Param("id") Long id);


}
