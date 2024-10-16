package com.yohaeng.gwangju.model;

import lombok.Data;

@Data
public class FoodDTO {

    private int id;
    private String title;
    private String addr1;
    private String addr2;
    private String image;
    private String tel;

    private Double rating;
    private Integer reviewCnt;

    private String cat1;
    private String cat2;
    private String cat3;
    private double mapX;
    private double mapY;
    private String sigunguCode;
    private int category;

}
