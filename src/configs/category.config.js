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
  { value: 'kitchen', name: 'Nhà bếp', icon: <RestaurantMenuRounded fontSize="small" /> },
  { value: 'garden', name: 'Vườn', icon: <BeachAccessRounded fontSize="small" /> },
  { value: 'light', name: 'Đèn', icon: <WbIncandescentRounded fontSize="small" /> },
  { value: 'bedroom', name: 'Phòng ngủ', icon: <AirlineSeatIndividualSuiteRounded fontSize="small" /> },
  { value: 'bathroom', name: 'Phòng tắm', icon: <HotTubRounded fontSize="small" /> },
  { value: 'playground', name: 'Sân chơi', icon: <SportsSoccerRounded fontSize="small" /> },
  { value: 'chairs', name: 'Ghế', icon: <WeekendRounded fontSize="small" /> },
  { value: 'desks', name: 'Bàn', icon: <EmojiFoodBeverageRounded fontSize="small" /> },
  { value: 'floor', name: 'Sàn gỗ', icon: <DashboardRounded fontSize="small" /> },
  { value: 'others', name: 'Khác', icon: <CasinoRounded fontSize="small" /> },
]
const fullList = [{ value: 'all', name: 'Tất cả', icon: <AllInclusiveRounded fontSize="small" /> }].concat(pureList);
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