package com.yohaeng.gwangju.service;

import com.yohaeng.gwangju.mapper.GwangjuMapper;
import com.yohaeng.gwangju.model.FoodDTO;
import com.yohaeng.gwangju.model.GwangjuDTO;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class GwangjuService {

    @Autowired
    private GwangjuMapper mapper;

    public void saveLocations() {
        // String url = "https://apis.data.go.kr/B551011/KorService1/areaBasedList1?numOfRows=171&MobileOS=ETC&MobileApp=Test&_type=json&arrange=A&contentTypeId=12&areaCode=5&serviceKey=YVPUrCOnZdjolCq4j5uww3InqQQ1ArFyIErpYYNIpYqteIx3UxJZJkYwuWiPXtJWfNhzXZLqTNZtsioArRtEqw==";
        //RestTemplate restTemplate = new RestTemplate();   // API방식의 json을 불러오는 방식
        try {
            String filePath = "C:/asd2.json";               //파일형태의  json을 불러오는 방식
            String content = new String(Files.readAllBytes(Paths.get(filePath)));
            // Map<String, Object> response  = restTemplate.getForObject(url, Map.class);
//        JSONObject json = new JSONObject(response);
//        JSONArray items = json.getJSONObject("response").getJSONObject("body").getJSONObject("items").getJSONArray("item");
            JSONObject json = new JSONObject(content);
            JSONArray items = json.getJSONArray("item");
            for (int i = 0; i < items.length(); i++) {
                JSONObject item = items.getJSONObject(i);

                //    GwangjuDTO location = new GwangjuDTO();
                FoodDTO location = new FoodDTO();
                location.setTitle(item.optString("title"));
                // location.setZipcode(item.optInt("zipcode"));
                location.setAddr1(item.optString("addr1"));
                location.setAddr2(item.optString("district"));
//            location.setFirstImage(item.optString("firstimage"));
//            if (item.optString("firstimage") != null && !item.optString("firstimage").isEmpty()) {
//                location.setIsImage(1);
//            } else {
//                location.setIsImage(0);
//            }
                location.setImage(item.optString("images", null));
                location.setTel(item.optString("tel"));
                location.setRating(item.optDouble("rating", 0));
                location.setReviewCnt(item.optInt("review_cnt", 0));
//            location.setDescription(item.optString("overview"));
//            location.setAreacode(item.optInt("areacode"));
//            location.setBookTour(item.optString("booktour"));
                location.setCat1(item.optString("cat1"));
                location.setCat2(item.optString("cat2"));
                location.setCat3(item.optString("cat3"));
//            location.setContentId(item.optInt("contentid"));
                location.setMapX(item.optDouble("mapX"));
                location.setMapY(item.optDouble("mapY"));
//            location.setMLevel(item.optInt("mlevel"));
//            location.setModifiedTime(item.optString("modifiedtime"));
                // location.setSigunguCode(item.optInt("sigungucode"));

                mapper.saveFood(location);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public List<GwangjuDTO> findAll(String sigungu) {

        return mapper.findAll(sigungu);

    }

    public List<GwangjuDTO> showDongs(String dongName) {
        return mapper.showDongs(dongName);
    }

    public List<GwangjuDTO> showDongs2() {
        return mapper.showDongs2();
    }

    public List<GwangjuDTO> showAllDongs(String dongName) {
        return mapper.showAllDongs(dongName);
    }

    public GwangjuDTO selectTour(int id) {
        return mapper.selectTour(id);
    }

    public GwangjuDTO selectTourDong(int id) {
        return mapper.selectTourDong(id);
    }

    public void updateDong(int id, String addr1) {
        Map<String, Object> params = new HashMap<>();
        System.out.println(id + "+" + addr1);
        params.put("id", id);
        params.put("addr1", addr1);

        mapper.updateDong(params);
    }

    public List<GwangjuDTO> sports(String sigungu) {
        return mapper.sports(sigungu);
    }

    public List<GwangjuDTO> parking(String sigungu) {
        return mapper.parking(sigungu);
    }


    // /map3/search 에 대응하는 검색 메서드
    public List<GwangjuDTO> searchByKeywordAndSigungu(String keyword, String sigunguCode) {
        Map<String, Object> params = new HashMap<>();
        params.put("keyword", keyword);
        params.put("sigunguCode", sigunguCode);
        return mapper.searchByMap3KeywordAndSigungu(params);
    }


}