import $ from 'jquery';
var Highcharts = require('highcharts');

export default class Home {
  constructor() {
    this.init();
  }

  init() {

    var skillChart = function () {
      let storedUsers = JSON.parse(localStorage["users"]);
      let allSkills = [];
      let skillCounter = [];
      var total = 0;

      $.each(storedUsers, function (index, user) {
        if (user.skills) {
          let skills = user.skills.split(',');

          $.each(skills, function (index, skill) {
            allSkills.push(skill);
          })
        }
      })

      $.each(allSkills, function (index, skill) {
        if (!skillCounter.length) {
          let newSkill = {[skill]: 1}
          skillCounter.push(newSkill);
        } else {
          var isExist = false;
          $.each(skillCounter, function (index, skillC) {
            if (skill === Object.keys(skillC).toString()) {
              isExist = true;
              let value = parseInt(Object.values(skillC)) + 1;
              skillCounter[index] = {[skill] : value};
              return;
            }
          })

          if (!isExist) {
            let newSkill = {[skill]: 1}
            skillCounter.push(newSkill);
          }
        }
        total++;
      })


      var skillChartData = [];
      $.each(skillCounter, function (index, obj) {
        var skillChart = {
          name: Object.keys(obj).toString(),
          y: parseInt(Object.values(obj))/total*100
        }
        skillChartData.push(skillChart);
      })

      Highcharts.chart('skill_chart', {
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie'
          },
          title: {
              text: ''
          },
          tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          credits: {
              enabled: false
          },
          plotOptions: {
              pie: {
                  allowPointSelect: false,
                  cursor: 'pointer',
                  dataLabels: {
                      enabled: false,
                      format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                      style: {
                          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                      }
                  }
              }
          },
          series: [{
              name: 'Skills',
              colorByPoint: true,
              data: skillChartData
          }]
      });
    }

    var skillHandler = function () {
      let $skillElms = $('.skill-elm__name');
      let $skillInput = $('[name=user_skills]');
      var skills = [];

      $.each($skillElms, function (index, skillElm) {
        var $skillElm = $(skillElm);
        var skillName = $skillElm.text();
        skills.push(skillName);
      })

      $skillInput.val(skills.join(','));
      validation($skillInput);
      return skills;
    }

    var skillListCollapse = function () {
      let $skillResults = $('.skill-results') ;
      let $skillList = $('.skill-list');

      $skillResults.off('click').on('click', function () {
        $skillList.stop().slideToggle();
      })
    }

    var skillChooser = function () {
      let $skillElm = $('.skill-elm');
      let $resultBoard = $('.skill-results__board');

      $skillElm.off('click').on('click', function () {
        let $this = $(this);
        let skillName = $this.text();

        $resultBoard.append('<span class="skill-elm__name">' + skillName + '<i class="glyphicon glyphicon-remove skill-elm__remove-btn"><i></span>');
        $this.parent().stop().slideUp();
        skillHandler();
      })

      $('body').off('click').on('click', '.skill-elm__remove-btn', function (e) {
        e.stopPropagation();
        let $this = $(this);
        let $skillElm = $this.parent();

        $skillElm.remove();
        skillHandler();
      })
    }

    var alertValid = function($formGroup) {
      $formGroup.addClass('valid');
      $formGroup.find('.user-form__error').hide();
      $formGroup.find('.user-form__valid').show();
    }

    var alertError = function($formGroup) {
      $formGroup.removeClass('valid');
      $formGroup.find('.user-form__valid').hide();
      $formGroup.find('.user-form__error').show();
    }

    var validation = function ($input) {
      let inputType = $input.attr('type');
      let $formGroup = $input.parents('.user-form__group');
      let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if ((inputType === 'text') && !$input.val()) {
        alertError($formGroup);
        return false;
      } else if (inputType === 'email' && !emailRegex.test($input.val().toLowerCase())) {
        alertError($formGroup);
        return false;
      }

      alertValid($formGroup);
      return true;
    }

    var formValidation = function () {
      let $inputs = $('#user_form input');
      let isValid = true;

      $.each($inputs, function (index, input) {
        var $input = $(input);
        if (!validation($input)) {
          isValid = false;
          return false;
        }
      })

      return isValid;
    }

    var userFormSubmit = function () {
      if (!localStorage["users"]) {
        var users = [];
        users[0] = { name : '', email: '', website: '', skills: '', gender: '' }
        localStorage["users"] = JSON.stringify(users);
      }

      $('.user-form__submit button').off('click').on('click', function () {
        if (!formValidation()) {
          return;
        }

        var storedUsers = JSON.parse(localStorage["users"]);

        let $userName = $('[name=user_name]');
        let $userEmail = $('[name=user_email]');
        let $userWebsite = $('[name=user_website]');
        let $userSkills = $('[name=user_skills]');
        let $userGender = $('[name=user_gender]:checked');

        let newUser = {
          name : $userName.val(),
          email: $userEmail.val(),
          website: $userWebsite.val(),
          skills: $userSkills.val(),
          gender: $userGender.val()
        }

        let isExist = false;

        $.each(storedUsers, function (index, user) {
          if (user.email === $userEmail.val()) {
            isExist = true;
            storedUsers[index] = newUser;
            localStorage["users"] = JSON.stringify(storedUsers);
            return;
          }
        })

        if (!isExist) {
          storedUsers.push(newUser);
          localStorage["users"] = JSON.stringify(storedUsers);
        }

        window.location.reload();

      })
    }

    var loadUserList = function () {
      if (localStorage["users"]) {
        let users = JSON.parse(localStorage["users"]);
        users.shift();

        if (!users.length) {
          return;
        }

        let userListHtml = [];
        let $userTable = $('.user-list__content__table tbody');

        $.each(users, function(index, user) {
          let userHtml = '<tr>'
                         + '<td class="__name">' + user.name + '</td>'
                         + '<td class="__email">' + user.email + '</td>'
                         + '<td class="__skills">' + user.skills + '</td>'
                         + '<td class="__gender">' + user.gender + '</td>'
                         + '<td class="__action">'
                            + '<button class="__action__edit" data-toggle="modal" data-target="#user_modal"><i class="glyphicon glyphicon-edit"> </i><span>Edit</span></button>'
                            + '<button class="__action__delete"><i class="glyphicon glyphicon-trash"></i><span>Delete</span></button>'
                         + '</td>'
                         + '</tr>';
          userListHtml.push(userHtml);
        })
        $userTable.append(userListHtml.join());
        deleteUser();
        editUser();
        skillChart();
      }
    }

    var deleteUser = function () {
      $('.user-list__content__table .__action__delete').off('click').on('click', function() {
        let $this = $(this);
        let $userRow = $this.parents('tr');
        let currentEmail = $userRow.find('.__email').text();
        var storedUsers = JSON.parse(localStorage["users"]);

        $.each(storedUsers, function (index, user) {
          if (user.email === currentEmail) {
            storedUsers.splice(index, 1);
            localStorage["users"] = JSON.stringify(storedUsers);
            $userRow.remove();
            return true;
          }
        })

        skillChart();
      })
    }

    var editUser = function () {
      $('.user-list__content__table .__action__edit').off('click').on('click', function() {
        let $this = $(this);
        let $userRow = $this.parents('tr');
        let $currentName = $userRow.find('.__name');
        let $currentEmail = $userRow.find('.__email');

        let $formUserName = $('[name=user_name]');
        let $formEmail = $('[name=user_email]');

        $formUserName.val($currentName.text());
        $formEmail.val($currentEmail.text());
      })
    }

    $('#user_form input').on('change keyup blur', function () {
      let $this = $(this);
      validation($this);
      progressBar();
    })

    var progressBar = function () {
      let $inputs = $('#user_form input[type=text],#user_form input[type=email]');
      let $validInput = $inputs.parents('.user-form__group.valid');

      let $progressStick = $('.user-form__progress-bar__stick');
      let $progressBar = $progressStick.parent();
      let percentage = ($progressBar.width() / 100) * ($validInput.length / $inputs.length * 100);
      $progressStick.animate({
        left: percentage
      })
    }

    skillListCollapse();
    skillChooser();
    userFormSubmit();
    loadUserList();
    progressBar();
  }
}
