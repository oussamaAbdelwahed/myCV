package iocv.app.repositories;

import iocv.app.beans.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin,Long>{
    Admin findByEmail(String email);
}
