package iocv.app.common;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import iocv.app.beans.CVImage;

import java.util.Iterator;
import java.util.List;

public class CommonTasks {

    public static String createJsonArray(List<CVImage> objects) {
        ObjectMapper mapper = new ObjectMapper();
        ArrayNode arrayOfJsonNodes= mapper.createArrayNode();
        Iterator<CVImage> it =objects.iterator();
        while(it.hasNext()) {
            CVImage tmp = it.next();
            ObjectNode node=  mapper.createObjectNode();
            node.put("id",tmp.getId());
            node.put("show",tmp.isShow());
            node.put("extension",tmp.getExtension());
            node.put("createdAt",tmp.getCreatedAt().toString());
            node.put("height",tmp.getHeight());
            node.put("width",tmp.getWidth());
            node.put("alt",tmp.getAlt());
            node.put("description",tmp.getDescription());
            node.put("type",tmp.getImageType().toString());
            node.put("src",tmp.getImageBase64());
            arrayOfJsonNodes.add(node);
        }
        return arrayOfJsonNodes.toString();
    }
}
