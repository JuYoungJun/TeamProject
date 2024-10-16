package com.yohaeng.gwangju.service;

import com.yohaeng.gwangju.mapper.FoodMapper;
import com.yohaeng.gwangju.model.FoodDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {
    @Autowired
    private FoodMapper mapper;

    public List<FoodDTO> foodAll() {
        return mapper.foodAll();
    }
    public List<FoodDTO> foodAll2(String sigunguCode) {
        return mapper.foodAll2(sigunguCode);
    }

    public List<FoodDTO> showFoodRating(String cat1) {
        return mapper.showFoodRating(cat1);
    }
    public List<FoodDTO> showFoodRating2(String sigunguCode, String cat1) {
        return mapper.showFoodRating2(sigunguCode,cat1);
    }
    public List<FoodDTO> showFoodRatingGu(String sigunguCode,String cat1) {
        return mapper.showFoodRatingGu(sigunguCode,cat1);
    }

    public List<FoodDTO> showFoodRatingDong(String sigunguCode,String dongName,String cat1) {
        return mapper.showFoodRatingDong(sigunguCode,dongName,cat1);
    }

    public List<FoodDTO> showFoodReview(String sigunguCode,String cat1) {
        return mapper.showFoodReview(sigunguCode,cat1);
    }

    public List<FoodDTO> showFoodReview2(String sigunguCode,String cat1) {
        return mapper.showFoodReview2(sigunguCode,cat1);
    }

    public List<FoodDTO> showFoodDongReview(String sigunguCode, String dongName,String cat1) {
        return mapper.showFoodDongReview(sigunguCode, dongName,cat1);
    }

    public List<FoodDTO> foodlist(String title, String sigunguCode, String addr1, String addr2, String cat1, Integer reviewCnt, Double rating, String sortType, int offset, int size) {
        return mapper.foodlist(title, sigunguCode, addr1, addr2, cat1, reviewCnt, rating, sortType, offset, size);
    }

    public int countFoodList(String title, String sigunguCode, String addr1, String addr2, String cat1, Integer reviewCnt, Double rating) {
        return mapper.countFoodList(title, sigunguCode, addr1, addr2, cat1, reviewCnt, rating);
    }

    public FoodDTO getFoodDetail(int id) {
        return mapper.getFoodDetail(id);
    }

    // 검색 키워드와 시군구 코드를 사용하여 장소 정보 검색
    public List<FoodDTO> searchPlaces(String keyword, String sigunguCode) {
        return mapper.searchByKeywordAndSigungu(keyword, sigunguCode);
    }

}
