package com.yohaeng.gwangju.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class GwangjuDTO {
    private int id;
    private String title;
    private Integer zipcode;
    private String addr1;
    private String addr2;
    private String home;
    private String firstImage;
    private int isImage;
    private String tel;
    private String description;
    private int areacode;
    private String bookTour;
    private String cat1;
    private String cat2;
    private String cat3;
    private int contentId;
    private double mapX;
    private double mapY;
    private int mLevel;
    private String modifiedTime;
    private int sigunguCode;
    private int category;
}


