function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('사이드바')
      .addItem('스왑 및 스테이킹', 'showSidebar')
      .addToUi();
}
// 시트 데이터 로딩
function loadSheetData() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); // 현재 스크립트가 실행 중인 스프레드시트를 가져옴
  var sheet = spreadsheet.getSheetByName("Validator");
  
  
  // 필요한 데이터 로딩
  var poolS = sheet.getRange("X9").getValue();
  var poolL = sheet.getRange("X8").getValue();
  var k = sheet.getRange("Y8").getValue();
  var lpS = sheet.getRange("W9").getValue();
  var lpL = sheet.getRange("W8").getValue();
  
  var playerData = {
    A: { S: sheet.getRange("W17").getValue(), L: sheet.getRange("V17").getValue() },
    B: { S: sheet.getRange("Y17").getValue(), L: sheet.getRange("X17").getValue() },
    C: { S: sheet.getRange("AA17").getValue(), L: sheet.getRange("Z17").getValue() },
    D: { S: sheet.getRange("AC17").getValue(), L: sheet.getRange("AB17").getValue() },
    E: { S: sheet.getRange("AE17").getValue(), L: sheet.getRange("AD17").getValue() },
    F: { S: sheet.getRange("AG17").getValue(), L: sheet.getRange("AF17").getValue() },
    G: { S: sheet.getRange("AI17").getValue(), L: sheet.getRange("AH17").getValue() },
    H: { S: sheet.getRange("AK17").getValue(), L: sheet.getRange("AJ17").getValue() }
  };
  console.log(poolS,poolL,lpS,lpL,playerData);
  console.log("Data loaded successfully");
  return { poolS: poolS, poolL: poolL, k: k, playerData: playerData, lpS: lpS, lpL: lpL };
  
}

// 클라이언트 측에서 사용할 수 있는 함수
function getSheetData() {
  return loadSheetData();
}

// 실행 로직 함수
function performSwap(player, action, swapAmount, pairAmount) {
  var data = loadSheetData();
  var poolS = data.poolS;
  var poolL = data.poolL;
  var k = data.k;
  var playerData = data.playerData;
  
  // 스왑 실행 로직 구현
  
  // 결과 출력
  var result = "";
  if (action === "swap") {
    // 스왑 결과 처리 및 결과 문자열 작성
  } else if (action === "stake") {
    // 스테이킹 결과 처리 및 결과 문자열 작성
  }


  return result;
}

// 사이드바 열기
function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('sidebar')
      .setTitle('스왑 및 스테이킹');
  SpreadsheetApp.getUi().showSidebar(html);
}

// 시트 데이터 업데이트 함수
function updateSheetData(poolS, poolL, playerData, activityLog) {
  
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); // 현재 스크립트가 실행 중인 스프레드시트를 가져옴
  var sheet = spreadsheet.getSheetByName("Validator");
  var logSheet = spreadsheet.getSheetByName("ActivityLog"); // 로그 시트
  var timestamp = new Date();

  // 풀 데이터 업데이트
  sheet.getRange("X9").setValue(poolS);
  sheet.getRange("X8").setValue(poolL);
  
  // 플레이어 데이터 업데이트
  sheet.getRange("W17").setValue(playerData['A'].S);
  sheet.getRange("V17").setValue(playerData['A'].L);
  sheet.getRange("Y17").setValue(playerData['B'].S);
  sheet.getRange("X17").setValue(playerData['B'].L);
  sheet.getRange("AA17").setValue(playerData['C'].S);
  sheet.getRange("Z17").setValue(playerData['C'].L);
  sheet.getRange("AC17").setValue(playerData['D'].S);
  sheet.getRange("AB17").setValue(playerData['D'].L);
  sheet.getRange("AE17").setValue(playerData['E'].S);
  sheet.getRange("AD17").setValue(playerData['E'].L);
  sheet.getRange("AG17").setValue(playerData['F'].S);
  sheet.getRange("AF17").setValue(playerData['F'].L);
  sheet.getRange("AI17").setValue(playerData['G'].S);
  sheet.getRange("AH17").setValue(playerData['G'].L);
  sheet.getRange("AK17").setValue(playerData['H'].S);
  sheet.getRange("AJ17").setValue(playerData['H'].L);

// 활동 내역 기록

 // 활동 내역 기록
  var logData = [timestamp, activityLog.player, activityLog.action, activityLog.swapType, activityLog.swapAmount, activityLog.executionAmount];
  logSheet.appendRow(logData);

  // 클라이언트 측으로 활동 내역 데이터 전송
  var activityLogOutput = document.getElementById("activityLogTableBody");
  var newRow = activityLogOutput.insertRow();
  for (var i = 0; i < logData.length; i++) {
    var cell = newRow.insertCell(i);
    cell.textContent = logData[i];
  }

  console.log(poolS, poolL, playerData, activityLog);
  console.log("Data updated successfully");
}
