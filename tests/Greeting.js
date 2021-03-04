import {greeting} from "../js/script"



test('Page should load 30 images, otherwise it should display an error ', () => {
   jest.useFakeTimers('Modern')
   jest.setSystemTime(new Date('2021-03-01T04:41:20')) 
   let date = new Date();
  let time = date.getHours();
   console.log(time);
})
