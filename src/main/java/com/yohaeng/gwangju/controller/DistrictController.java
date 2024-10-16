package com.yohaeng.gwangju.controller;

import com.yohaeng.gwangju.model.GwangjuDTO;
import com.yohaeng.gwangju.service.GwangjuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class DistrictController {

    @Autowired
    private GwangjuService service;

    @PostMapping("/gu")
    public String showMain(@RequestParam("guName") String guName, @RequestParam("sigunguCode") String sigunguCode, @RequestParam("centerLng") String centerLng, @RequestParam("centerLat") String centerLat, Model model) {
        System.out.println("행정구 post");
        List<GwangjuDTO> list = service.findAll(String.valueOf(sigunguCode));
        model.addAttribute("sigunguCode", sigunguCode);
        model.addAttribute("list", list);
        model.addAttribute("guName", guName);
        model.addAttribute("centerLng", centerLng);
        model.addAttribute("centerLat", centerLat);
        return "gwangju/district :: content";
    }

    @PostMapping("/gu/data")
    @ResponseBody
    public List<GwangjuDTO> showMainData(@RequestParam("guName") String guName,
                                         @RequestParam("sigunguCode") String sigunguCode,
                                         @RequestParam("centerLng") String centerLng,
                                         @RequestParam("centerLat") String centerLat) {
        System.out.println("행정구 Data");
        List<GwangjuDTO> list = service.findAll(sigunguCode);

        Collections.shuffle(list);

        return list; // JSON 형식으로 반환
    }




    @PostMapping("/{guName}/dongs")
    public String showDongs(@PathVariable("guName") String guName, @RequestParam("sigunguCode") String sigunguCode, @RequestParam("dongName") String dongName, @RequestParam("centerLng") String centerLng, @RequestParam("centerLat") String centerLat, Model model) {


        List<GwangjuDTO> list = service.showDongs(dongName);
        List<GwangjuDTO> list2 = service.showDongs2();
        System.out.println(guName+"포스트");
        model.addAttribute("list", list);
        model.addAttribute("list2", list2);
        model.addAttribute("sigunguCode", sigunguCode);
        model.addAttribute("guName", guName);
        model.addAttribute("dongName", dongName);
        model.addAttribute("centerLng", centerLng);
        model.addAttribute("centerLat", centerLat);
        return "gwangju/dongs :: content";
    }

    @PostMapping("/{guName}/dongs/data")
    @ResponseBody
    public List<GwangjuDTO> showDongData(@RequestParam("dongName") String dongName) {

        System.out.println("행정동 Data");
        List<GwangjuDTO> list = service.showAllDongs(dongName);

        Collections.shuffle(list);

        return list; // JSON 형식으로 반환
    }


    @GetMapping("/districtOverlay")
    public String GetdistrictOverlay(@RequestParam("guName") String guName, @RequestParam("sigunguCode") String sigunguCode, @RequestParam("centerLng") String centerLng, @RequestParam("centerLat") String centerLat, Model model) {
        System.out.println("오버레이외않되");
        List<GwangjuDTO> list = service.findAll(String.valueOf(sigunguCode));
        model.addAttribute("sigunguCode", sigunguCode);
        model.addAttribute("list", list);
        model.addAttribute("guName", guName);
        model.addAttribute("centerLng", centerLng);
        model.addAttribute("centerLat", centerLat);
        return "gwangju/district :: content";
    }
}