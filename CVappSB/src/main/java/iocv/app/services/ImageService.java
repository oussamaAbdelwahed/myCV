package iocv.app.services;

import iocv.app.beans.CVImage;

import iocv.app.common.ImageType;

import iocv.app.repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
public class ImageService {
    @Autowired
    private ImageRepository imageRepository;
    public CVImage getLogoImage() {
        CVImage logo = null;
        try{
            logo = this.imageRepository.findByTypeAndShow(ImageType.NAVBAR_LOGO,true);
        }catch(Exception e){}
        return logo;
    }

    public CVImage getMyBigPicture() {
        CVImage meBigPicture = null;
        try{
           meBigPicture = this.imageRepository.findByTypeAndShow(ImageType.ME_BIG_PICTURE,true);
        }catch(Exception e){}
        return meBigPicture;
    }

    public List<CVImage> getAllCertifications() {
         List<CVImage> certifications = new LinkedList<>();
         try{
           certifications = this.imageRepository.getAllActiveCertifications(ImageType.CERTIFICATION.toString(),true);
         }catch (Exception e){
             e.printStackTrace();
         }
         return certifications;
    }

    public CVImage getOneById(Long id) {
        Optional<CVImage>  opt= this.imageRepository.findById(id);
        return opt.get();
    }


   public List<CVImage> getAllImagesByType(ImageType type) {
       List<CVImage> all = new LinkedList<>();
       try {
           all = this.imageRepository.findAllByType(type);
       }catch (Exception e) {
           e.printStackTrace();
       }
       return all;
   }

   public boolean saveCVImage(CVImage image) {
        try{
             this.imageRepository.save(image);
            return true;
        }catch(Exception e) {
            return false;
        }
   }

   public boolean updateCVImage(CVImage image, boolean withImage) {
      try{
       if(withImage) {
                /*tmp = this.imageRepository.findById(image.getId()).get();
                tmp.setAlt(image.getAlt());
                tmp.setImage(image.getImage());
                tmp.setShow(image.isShow());
                tmp.setDescription(image.getDescription());
                tmp = this.imageRepository.save(tmp);*/
           this.imageRepository.updateCVImage(image.isShow(), image.getAlt(), image.getDescription(), image.getImage(), image.getId());
       } else {
                 /* tmp.setAlt(image.getAlt());
                  tmp.setShow(image.isShow());
                  tmp.setDescription(image.getDescription());
                  tmp = this.imageRepository.save(tmp);*/
          this.imageRepository.updateCVImagePlainCredentials(image.isShow(), image.getAlt(), image.getDescription(), image.getId());
       }
       return true;

      }catch (Exception e) {
          e.printStackTrace();
          return false;
      }
   }

   public boolean deleteCVImage(Long id) {
        try{
           this.imageRepository.deleteById(id);
            return true;
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
   }
}
