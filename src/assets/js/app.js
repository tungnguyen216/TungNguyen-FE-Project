import $ from 'jquery';
import 'bootstrap-sass';
import 'slick-carousel';
import Home from './components/home';

export class EkMain {
  constructor() {
    this.init();
  }

  init() {
    new Home();
  }
}

$(document).ready(function() {
  new EkMain();
});
