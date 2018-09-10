package iocv.app.common;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class MultipartFileManipulation {
    public MultipartFileManipulation() {}
    private static String [] imagesExtension  = {"svg","png","jpeg","jpg","gif"};

    public static String getExtension(MultipartFile file) {
        return file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf('.')+1);
    }

    public static String getName(MultipartFile file) {
        return file.getOriginalFilename().substring(0,file.getOriginalFilename().lastIndexOf('.'));
    }

    private static boolean extensionExists(String ext) {
        for(String s : imagesExtension) {
            if(s.equalsIgnoreCase(ext))
                return true;
        }
        return false;
    }

    public static boolean isImage(MultipartFile file) {
        return (extensionExists(getExtension(file)));
    }
}
