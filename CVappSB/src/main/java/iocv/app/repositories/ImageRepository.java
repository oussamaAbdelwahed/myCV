package iocv.app.repositories;

import iocv.app.beans.CVImage;
import iocv.app.common.ImageType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<CVImage,Long> {
    CVImage findByTypeAndShow(ImageType type,boolean isShown);

    @Query(value="SELECT * FROM images i WHERE i.image_type = :type AND i.show_image = :show ",nativeQuery = true)
    List<CVImage> getAllActiveCertifications(@Param("type") String type,@Param("show") boolean isShown);
}
