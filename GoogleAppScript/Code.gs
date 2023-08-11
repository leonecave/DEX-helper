function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('사이드바')
      .addItem('DEX 도우미', 'showSidebar')
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
    A: { S: sheet.getRange("W24").getValue(), L: sheet.getRange("V24").getValue() },
    B: { S: sheet.getRange("W25").getValue(), L: sheet.getRange("V25").getValue() },
    C: { S: sheet.getRange("W26").getValue(), L: sheet.getRange("V26").getValue() },
    D: { S: sheet.getRange("W27").getValue(), L: sheet.getRange("V27").getValue() },
    E: { S: sheet.getRange("W28").getValue(), L: sheet.getRange("V28").getValue() },
    F: { S: sheet.getRange("W29").getValue(), L: sheet.getRange("V29").getValue() },
    G: { S: sheet.getRange("W30").getValue(), L: sheet.getRange("V30").getValue() },
    H: { S: sheet.getRange("W31").getValue(), L: sheet.getRange("V31").getValue() }
  };
  console.log(poolS,poolL,lpS,lpL,playerData);
  console.log("Data loaded successfully");
  return { poolS: poolS, poolL: poolL, k: k, playerData: playerData, lpS: lpS, lpL: lpL };
  
}

// 클라이언트 측에서 사용할 수 있는 함수
function getSheetData() {
  return loadSheetData();
}

// 사이드바 열기
function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('sidebar')
      .setTitle('DEX 도우미 by 동굴맨');
  SpreadsheetApp.getUi().showSidebar(html);
}

// 시트 데이터 업데이트 함수
function updateSheetData(poolS, poolL, playerData, activityLog,queue) {
  
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); // 현재 스크립트가 실행 중인 스프레드시트를 가져옴
  var sheet = spreadsheet.getSheetByName("Validator");
  var logSheet = spreadsheet.getSheetByName("ActivityLog"); // 로그 시트
  var timestamp = new Date();
  var queueTotal = queue.length;
  
  sheet.getRange("V19").setValue(queueTotal);

  // 풀 데이터 업데이트
  sheet.getRange("X9").setValue(poolS);
  sheet.getRange("X8").setValue(poolL);
  
  
  // 플레이어 데이터 업데이트
  sheet.getRange("W24").setValue(playerData['A'].S);
  sheet.getRange("V24").setValue(playerData['A'].L);
  sheet.getRange("W25").setValue(playerData['B'].S);
  sheet.getRange("V25").setValue(playerData['B'].L);
  sheet.getRange("W26").setValue(playerData['C'].S);
  sheet.getRange("V26").setValue(playerData['C'].L);
  sheet.getRange("W27").setValue(playerData['D'].S);
  sheet.getRange("V27").setValue(playerData['D'].L);
  sheet.getRange("W28").setValue(playerData['E'].S);
  sheet.getRange("V28").setValue(playerData['E'].L);
  sheet.getRange("W29").setValue(playerData['F'].S);
  sheet.getRange("V29").setValue(playerData['F'].L);
  sheet.getRange("W30").setValue(playerData['G'].S);
  sheet.getRange("V30").setValue(playerData['G'].L);
  sheet.getRange("W31").setValue(playerData['H'].S);
  sheet.getRange("V31").setValue(playerData['H'].L);

// 활동 내역 기록

 // 활동 내역 기록
  if (activityLog.action === "slswap" || activityLog.action === "lsswap") {
    var logData = [timestamp, activityLog.player, activityLog.action, activityLog.inputAmount, activityLog.executionAmount];
    logSheet.appendRow(logData);
  } 
  
  else if (activityLog.action === "stake"|| activityLog.action === "unstake") {
    var stakeLogData = [timestamp, activityLog.player, activityLog.action, activityLog.inputAmount, activityLog.executionAmount];
    logSheet.appendRow(stakeLogData);
  }

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
