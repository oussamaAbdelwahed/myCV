package iocv.app.config;

import iocv.app.beans.Admin;
import iocv.app.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class AppUserDetailsService implements UserDetailsService {
  @Autowired
   private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.err.println("in "+this.getClass().getName());
        Admin admin = this.adminRepository.findByEmail(email);
        if(admin == null) {
            throw new UsernameNotFoundException(email);
        }
        return admin;
    }
}
