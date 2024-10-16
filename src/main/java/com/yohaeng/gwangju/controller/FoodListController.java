package com.yohaeng.gwangju.controller;

import com.yohaeng.gwangju.model.FoodDTO;
import com.yohaeng.gwangju.model.GwangjuDTO;
import com.yohaeng.gwangju.service.FoodService;
import com.yohaeng.gwangju.service.GwangjuService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class FoodListController {

    @Value("${google.maps.api-key}")  // `application.properties`에서 Google Maps API 키 읽어오기
    private String googleMapsApiKey;

    @Autowired
    private FoodService service;

    @GetMapping("/foodlist")
    public String foodlist(
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "sigunguCode", required = false) String sigunguCode,
            @RequestParam(value = "addr1", required = false) String addr1,
            @RequestParam(value = "addr2", required = false) String addr2,
            @RequestParam(value = "cat1", required = false) String cat1,
            @RequestParam(value = "reviewCnt", required = false) Integer reviewCnt,
            @RequestParam(value = "rating", required = false) Double rating,
            @RequestParam(value = "sortType", required = false) String sortType,  // 정렬 기준 추가
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "15") int size,
            Model model) {

        // 서비스 레이어에서 음식 리스트 조회 및 페이징 처리
        int offset = (page - 1) * size; // 페이징 오프셋 계산
        List<FoodDTO> foodList = service.foodlist(title, sigunguCode, addr1, addr2, cat1, reviewCnt, rating, sortType, offset, size);
        int totalItems = service.countFoodList(title, sigunguCode, addr1, addr2, cat1, reviewCnt, rating);

        // 결과 리스트를 모델에 추가하여 뷰에 전달
        model.addAttribute("foodList", foodList);
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", (int) Math.ceil((double) totalItems / size));
        model.addAttribute("totalItems", totalItems);
        model.addAttribute("title", title);
        model.addAttribute("sigunguCode", sigunguCode);
        model.addAttribute("sortType", sortType);

        // Thymeleaf 템플릿 호출
        return "food/foodList";
    }

    // 음식 상세 조회
    @GetMapping("/fooddetail/{id}")
    public String getFoodDetail(@PathVariable("id") int id, Model model) {
        FoodDTO food = service.getFoodDetail(id);
        model.addAttribute("food", food);
        model.addAttribute("googleMapsApiKey", googleMapsApiKey);
        return "food/foodDetail";
    }

}