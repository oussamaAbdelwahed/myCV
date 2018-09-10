package iocv.app.repositories;

import iocv.app.beans.CVImage;
import iocv.app.common.ImageType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<CVImage,Long> {
    CVImage findByTypeAndShow(ImageType type,boolean isShown);

    @Query(value="SELECT * FROM images i WHERE i.image_type = :type AND i.show_image = :show ",nativeQuery = true)
    List<CVImage> getAllActiveCertifications(@Param("type") String type,@Param("show") boolean isShown);

    List<CVImage> findAllByType(ImageType type);

    @Transactional
    @Modifying
    @Query("UPDATE CVImage i SET i.show = :show,i.alt = :alt,i.description = :description, i.image=:image WHERE i.id = :id")
    void updateCVImage(@Param("show") boolean show,@Param("alt") String alt,@Param("description") String description, @Param("image") byte[] image,@Param("id") Long id);



    @Transactional
    @Modifying
    @Query("UPDATE CVImage i SET i.show = :show,i.alt = :alt,i.description = :description WHERE i.id = :id")
    void updateCVImagePlainCredentials(@Param("show") boolean show,@Param("alt") String alt,@Param("description") String description,@Param("id") Long id);
}
