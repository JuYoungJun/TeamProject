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
import java.util.List;

@Controller
public class GwangjuController {

    @Value("${google.maps.api-key}")  // `application.properties`에서 Google Maps API 키 읽어오기
    private String googleMapsApiKey;

    @Value("${kakao.maps.app-key}")  // application.properties에서 Kakao Maps API 키 읽어오기
    private String kakaoMapsAppKey;

    @Autowired
    private GwangjuService service;
    @Autowired
    private FoodService foodService;

   // @GetMapping("/insertAll")
   // public String saveLocations() {
   //     service.saveLocations();
   //     return "redirect:/main";
   // } 
   // 데이터 베이스 정보 너을떄 사용한거

    @GetMapping("/utils/dong")
    public void dongChange(Model model, @RequestParam(value = "sigungu", required = false) String sigungu) {
        System.out.println("동채인지");
        List<GwangjuDTO> list = service.findAll(sigungu);
        model.addAttribute("list", list);
    }

    @GetMapping("/")
    public String redirectToMain() {
        return "redirect:/main";
    }

    @GetMapping("/main")
    public String showMain(Model model, @RequestParam(value = "sigungu", required = false) String sigungu) {
        System.out.println("여긴가 main");
        List<GwangjuDTO> list = service.findAll(sigungu);
        List<FoodDTO> listFood = foodService.foodAll();
        Collections.shuffle(list);
        Collections.shuffle(listFood);
        model.addAttribute("items", list);
        model.addAttribute("foods", listFood);
        return "main";
    }

    @PostMapping("/sidebarData")
    @ResponseBody
    public GwangjuDTO sidebarData(@RequestParam(value = "id", required = false) int id) {
        GwangjuDTO sideData = service.selectTour(id);
        System.out.println("sideData = " + sideData);
        return sideData;
    }

    @PostMapping("/sidebarData2")
    @ResponseBody
    public GwangjuDTO sidebarData2(@RequestParam(value = "id", required = false) int id) {
        GwangjuDTO sideData = service.selectTourDong(id);
        System.out.println("sideData = " + sideData);
        return sideData;
    }

    @GetMapping("/map")
    public String showMap(Model model, @RequestParam(value = "sigungu", required = false) String sigungu) {
        System.out.println("여기야? map");
        List<GwangjuDTO> list = service.findAll(sigungu);
        Collections.shuffle(list);
        model.addAttribute("lists", list);
        model.addAttribute("googleMapsApiKey", googleMapsApiKey);
        return "gwangju/map";
    }



    @PostMapping("/map")
    public String postShowMap(Model model, @RequestParam(value = "sigungu", required = false) String sigungu) {
        System.out.println("sigungu" + sigungu);
        List<GwangjuDTO> list = service.findAll(sigungu);
        Collections.shuffle(list);
        model.addAttribute("lists", list);
        return "gwangju/gwangju :: content";
    }


    @PostMapping("/map2")
    public String postShowMap2(Model model, @RequestParam(value = "sigungu", required = false) String sigungu) {
        System.out.println("sigungu" + sigungu);
        List<GwangjuDTO> list = service.findAll(sigungu);
        Collections.shuffle(list);
        model.addAttribute("lists", list);
        return "gwangju/gwangjuNoMaker :: content";
    }

    @GetMapping("/map3")
    public String showMap3(Model model, @RequestParam(value = "sigungu", required = false) String sigungu) {
        System.out.println("여기야? map");
        List<GwangjuDTO> list = service.findAll(sigungu);
        model.addAttribute("list", list);
        model.addAttribute("kakaoMapsAppKey", kakaoMapsAppKey);
        return "gwangju/map3";
    }

    @GetMapping("/map3all")
    public String showMap3All(Model model, @RequestParam(value = "sigungu", required = false) String sigungu) {
        System.out.println("여기야? map");
        List<GwangjuDTO> list = service.findAll(sigungu);
        List<GwangjuDTO> list2 = service.showDongs2();
        model.addAttribute("list", list);
        model.addAttribute("list2", list2);
        model.addAttribute("kakaoMapsAppKey", kakaoMapsAppKey);
        return "gwangju/map3";
    }

    @GetMapping("/map3/search")
    @ResponseBody
    public List<GwangjuDTO> searchByMap3KeywordAndSigungu(@RequestParam(value = "keyword", required = false) String keyword,
                                                @RequestParam(value = "sigungu", required = false) String sigungu) {
        return service.searchByKeywordAndSigungu(keyword, sigungu);
    }


    @PostMapping("/mapSports")
    public String showSports(Model model, @RequestParam(value = "sigungu", required = false) String sigungu) {
        System.out.println("스포츠 메인");
        List<GwangjuDTO> list = service.sports(sigungu);
        Collections.shuffle(list);
        model.addAttribute("lists", list);
        return "gwangju/gwangju :: content";
    }

    @PostMapping("/mapParking")
    public String showParking(Model model, @RequestParam(value = "sigungu", required = false) String sigungu) {
        System.out.println("주차장 메인");
        List<GwangjuDTO> list = service.sports(sigungu);
        Collections.shuffle(list);
        model.addAttribute("lists", list);
        return "gwangju/gwangju :: content";
    }

    @ResponseBody
    @PostMapping("/saveDong")
    public String saveAreaCode(@RequestParam("id") int id, @RequestParam("addr1") String addr1) {
        service.updateDong(id, addr1);
        return "행정동입력완료";
    }

    @GetMapping("/map4")
    public String showMap4(Model model, @RequestParam(value = "sigunguCode", required = false) String sigunguCode) {
        System.out.println("여기야? map");
        List<FoodDTO> list = foodService.foodAll2(sigunguCode);
        model.addAttribute("list", list);
        model.addAttribute("kakaoMapsAppKey", kakaoMapsAppKey);
        return "food/foodmap3";
    }

    @GetMapping("/search")
    @ResponseBody
    public List<FoodDTO> searchPlaces(@RequestParam(value = "keyword", required = false) String keyword,
                                      @RequestParam(value = "sigunguCode", required = false) String sigunguCode) {
        return foodService.searchPlaces(keyword, sigunguCode);
    }

}
