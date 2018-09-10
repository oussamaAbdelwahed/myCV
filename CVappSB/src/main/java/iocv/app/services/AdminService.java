package iocv.app.services;

import iocv.app.beans.Admin;
import iocv.app.beans.CVImage;
import iocv.app.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;


    public boolean updateAdminCredentials(Admin admin, String oldPassword) {
        Admin persistedAdmin = this.adminRepository.findById(admin.getId()).get();
        try {
            if (persistedAdmin != null) {
                if (admin.getPassword() != null) {
                    persistedAdmin.setFirstName(admin.getFirstName());
                    persistedAdmin.setLastName(admin.getLastName());
                    persistedAdmin.setEmail(admin.getEmail());
                    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
                    String encodedNewPassword = encoder.encode(admin.getPassword());
                    String encodedOldPassword =  encoder.encode(oldPassword);
                    if ( encoder.matches(oldPassword,persistedAdmin.getPassword())) {
                        persistedAdmin.setPassword(encodedNewPassword);
                        this.adminRepository.save(persistedAdmin);
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    persistedAdmin.setFirstName(admin.getFirstName());
                    persistedAdmin.setLastName(admin.getLastName());
                    persistedAdmin.setEmail(admin.getEmail());
                    this.adminRepository.save(persistedAdmin);
                    return true;
                }
            }
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return false;
    }
}
