package iocv.app.repositories;

import iocv.app.beans.MyInformations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.TransactionScoped;
import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface MyInformationsRepository extends JpaRepository<MyInformations,Long>{
    MyInformations findByCurrent(boolean current);

    /*List<MyInformations> findAllByCurrentByOrderByIdDesc(boolean current);*/

    @Modifying
    @Transactional
    @Query("UPDATE MyInformations infos SET infos.tel = :tel, infos.email = :email, infos.address = :address, infos.zip = :zip, infos.paragraphe = :paragraphe, infos.current = :current WHERE infos.id = :id")
    void updateMyInforations(
            @Param("tel") String tel,
            @Param("email") String email,
            @Param("address") String address,
            @Param("zip") String zip,
            @Param("paragraphe") String paragraphe,
            @Param("current") boolean current,
            @Param("id") Long id
    );
}
