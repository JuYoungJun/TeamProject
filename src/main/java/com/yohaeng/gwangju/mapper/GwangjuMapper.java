package com.yohaeng.gwangju.mapper;

import com.yohaeng.gwangju.model.FoodDTO;
import com.yohaeng.gwangju.model.GwangjuDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface GwangjuMapper {

    List<GwangjuDTO> findAll(@Param("sigungu") String sigungu);

    void save(GwangjuDTO location);

    void saveFood(FoodDTO food);

    List<GwangjuDTO> showDongs(String dongName);

    List<GwangjuDTO> showDongs2();

    List<GwangjuDTO> showAllDongs(String dongName);

    GwangjuDTO selectTour(int id);

    GwangjuDTO selectTourDong(int id);

    void updateDong(Map<String, Object> params);

    List<GwangjuDTO> sports(String sigungu);

    List<GwangjuDTO> parking(String sigungu);

    // /map3/search 에 대응하는 검색 메서드
    List<GwangjuDTO> searchByMap3KeywordAndSigungu(@Param("params") Map<String, Object> params);


}
