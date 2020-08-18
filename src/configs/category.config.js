import React from 'react';

import {
  WbIncandescentRounded, DashboardRounded, BeachAccessRounded,
  SportsSoccerRounded, CasinoRounded, AirlineSeatIndividualSuiteRounded,
  RestaurantMenuRounded, AllInclusiveRounded, WeekendRounded,
  EmojiFoodBeverageRounded, HotTubRounded
} from '@material-ui/icons';

/**
 * Contructor
 */
const configs = {}

const pureList = [
  { value: 'kitchen', name: 'Nhà bếp', icon: <RestaurantMenuRounded /> },
  { value: 'garden', name: 'Vườn', icon: <BeachAccessRounded /> },
  { value: 'light', name: 'Đèn', icon: <WbIncandescentRounded /> },
  { value: 'bedroom', name: 'Phòng ngủ', icon: <AirlineSeatIndividualSuiteRounded /> },
  { value: 'bathroom', name: 'Phòng tắm', icon: <HotTubRounded /> },
  { value: 'playground', name: 'Sân chơi', icon: <SportsSoccerRounded /> },
  { value: 'chairs', name: 'Ghế', icon: <WeekendRounded /> },
  { value: 'desks', name: 'Bàn', icon: <EmojiFoodBeverageRounded /> },
  { value: 'floor', name: 'Sàn gỗ', icon: <DashboardRounded /> },
  { value: 'others', name: 'Khác', icon: <CasinoRounded /> },
]
const fullList = [{ value: 'all', name: 'Tất cả', icon: <AllInclusiveRounded /> }].concat(pureList);
const shortList = fullList.filter((item, index) => index <= 5);


/**
 * Development configurations
 */
configs.development = {
  pureList,
  fullList,
  shortList,
}

/**
 * Staging configurations
 */
configs.staging = {
  pureList,
  fullList,
  shortList,
}

/**
 * Production configurations
 */
configs.production = {
  pureList,
  fullList,
  shortList,
}

/**
 * Module exports
 */
export default configs;