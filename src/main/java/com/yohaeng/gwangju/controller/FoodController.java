package com.yohaeng.gwangju.controller;

import com.yohaeng.gwangju.model.FoodDTO;
import com.yohaeng.gwangju.model.GwangjuDTO;
import com.yohaeng.gwangju.service.FoodService;
import com.yohaeng.gwangju.service.GwangjuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@RequestMapping("/food")
@Controller
public class FoodController {

    @Value("${google.maps.api-key}")  // `application.properties`에서 Google Maps API 키 읽어오기
    private String googleMapsApiKey;

    @Autowired
    private FoodService service;

    @GetMapping("")
    public String showFood(Model model, @RequestParam(value = "sigunguCode", required = false) String sigunguCode,
                           @RequestParam(value = "dongName", required = false) String dongName,
                           @RequestParam(value = "cat1", required = false) String cat1) {
        System.out.println("푸드");
        List<FoodDTO> listRating = service.showFoodRating(cat1);
        List<FoodDTO> listReview = service.showFoodReview(sigunguCode,cat1);
        model.addAttribute("listRating", listRating);
        model.addAttribute("listReview", listReview);
        model.addAttribute("googleMapsApiKey", googleMapsApiKey);
        return "food/food";
    }
    @PostMapping("/data")
    @ResponseBody
    public Map<String,List<FoodDTO>> showFoodData(@RequestParam(value = "cat1", required = false) String cat1,
                                                  @RequestParam(value = "sigunguCode", required = false) String sigunguCode) {
        System.out.println("푸드 Data");
        if (sigunguCode.equals("")){
            sigunguCode = null;
        }
        List<FoodDTO> listRating = service.showFoodRating2(sigunguCode,cat1);
        List<FoodDTO> listReview = service.showFoodReview2(sigunguCode,cat1);
        Map<String,List<FoodDTO>> map = new HashMap<>();

        
        map.put("listRating",listRating);
        map.put("listReview",listReview);
        return map;
    }

    @PostMapping("")
    public String postShowFood( @RequestParam(value = "sigungu", required = false) String sigungu) {
        System.out.println("포스트 푸드");
        return "food/gwangju :: content";
    }

    @PostMapping("/foodGu")
    public String showFood(@RequestParam("guName") String guName,
                           @RequestParam("sigunguCode") String sigunguCode,
                           @RequestParam("centerLng") String centerLng,
                           @RequestParam("centerLat") String centerLat, Model model) {
        System.out.println("푸드 post");
        model.addAttribute("sigunguCode", sigunguCode);
        model.addAttribute("guName", guName);
        model.addAttribute("centerLng", centerLng);
        model.addAttribute("centerLat", centerLat);
        return "food/foodDistrict :: content";
    }

    @PostMapping("/foodGu/data")
    @ResponseBody
    public Map<String,Object> showFoodData(@RequestParam(value ="guName", required = false) String guName,
                            @RequestParam(value = "sigunguCode", required = false) String sigunguCode,
                            @RequestParam(value ="centerLng" ,required = false) String centerLng,
                            @RequestParam(value ="centerLat" ,required = false) String centerLat,
                             @RequestParam(value = "cat1", required = false) String cat1){
        if (cat1.equals("")){
            cat1 = null;
        }

        System.out.println("푸드구 Data");

        List<FoodDTO> listRating = service.showFoodRatingGu(sigunguCode,cat1);
        System.out.println("listRating = " + listRating);
        List<FoodDTO> listReview = service.showFoodReview(sigunguCode,cat1);
        Map<String,Object> map = new HashMap<>();
        map.put("sigunguCode",sigunguCode);
        map.put("guName",guName);
        map.put("listRating",listRating);
        map.put("listReview",listReview);

        return map;
    }
    @PostMapping("/{guName}/foodDongs")
    public String showFoodDong(@PathVariable("guName") String guName,
                               @RequestParam("sigunguCode") String sigunguCode,
                               @RequestParam("centerLng") String centerLng,
                               @RequestParam("centerLat") String centerLat, Model model,
                               @RequestParam("dongName") String dongName) {
        System.out.println("푸드동 post");
        model.addAttribute("sigunguCode", sigunguCode);
        model.addAttribute("guName", guName);
        model.addAttribute("dongName", dongName);
        model.addAttribute("centerLng", centerLng);
        model.addAttribute("centerLat", centerLat);
        return "food/foodDongs :: content";
    }

    @PostMapping("/{guName}/foodDongs/data")
    @ResponseBody
    public Map<String,Object> showFoodDongData(@PathVariable(value ="guName",required = false) String guName,
                                                      @RequestParam(value = "sigunguCode", required = false) String sigunguCode,
                                                      @RequestParam(value ="centerLng",required = false) String centerLng,
                                                      @RequestParam(value ="centerLat",required = false) String centerLat,
                                                      @RequestParam(value ="dongName",required = false) String dongName,
                                                      @RequestParam(value = "cat1", required = false) String cat1){

        if (cat1.equals("")){
            cat1 = null;
        }

        System.out.println("푸드동 Data");
        List<FoodDTO> listRating = service.showFoodRatingDong(sigunguCode,dongName,cat1);
        System.out.println("동네임 = " + dongName);
        List<FoodDTO> listReview = service.showFoodDongReview(sigunguCode,dongName,cat1);
        System.out.println("listReview = " + listReview);
        Map<String,Object> map = new HashMap<>();
        map.put("sigunguCode",sigunguCode);
        map.put("guName",guName);
        map.put("dongName",dongName);

        map.put("listRating",listRating);
        map.put("listReview",listReview);

        return map;
    }

}
