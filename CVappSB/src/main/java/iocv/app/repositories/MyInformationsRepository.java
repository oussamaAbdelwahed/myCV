package iocv.app.repositories;

import iocv.app.beans.MyInformations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyInformationsRepository extends JpaRepository<MyInformations,Long>{
    MyInformations findByCurrent(boolean current);
}
