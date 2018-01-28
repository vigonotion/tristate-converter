function convert() {
  var family = document.getElementById("family").value;
  var group = document.getElementById("group").value;
  var device = document.getElementById("device").value;

  if(family != "- family -" &&
      group != "- group -" &&
      device != "- device -") {

    document.getElementById("result").value = "=== Generated Intertechno Code ===\n"
                                            + "[ON]:  " + getTriState(getCodeWordC(family, group, device, true)) + "\n"
                                            + "[OFF]: " + getTriState(getCodeWordC(family, group, device, false));

  } else {
    document.getElementById("result").value = "[error]: wrong selection"
  }
}

function getCodeWordC(sFamily, nGroup, nDevice, bStatus) {
  var sReturn = '            ';
  var nReturnPos = 0;

  var nFamily = sFamily.charCodeAt() - 'a'.charCodeAt();
  if ( nFamily < 0 || nFamily > 15 || nGroup < 1 || nGroup > 4 || nDevice < 1 || nDevice > 4) {
    return 0;
  }

  // encode the family into four bits
  sReturn = sReturn.replaceAt(nReturnPos++, (nFamily & 1) ? 'F' : '0');
  sReturn = sReturn.replaceAt(nReturnPos++, (nFamily & 2) ? 'F' : '0');
  sReturn = sReturn.replaceAt(nReturnPos++, (nFamily & 4) ? 'F' : '0');
  sReturn = sReturn.replaceAt(nReturnPos++, (nFamily & 8) ? 'F' : '0');

  // encode the device and group
  sReturn = sReturn.replaceAt(nReturnPos++, ((nDevice-1) & 1) ? 'F' : '0');
  sReturn = sReturn.replaceAt(nReturnPos++, ((nDevice-1) & 2) ? 'F' : '0');
  sReturn = sReturn.replaceAt(nReturnPos++, ((nGroup-1) & 1) ? 'F' : '0');
  sReturn = sReturn.replaceAt(nReturnPos++, ((nGroup-1) & 2) ? 'F' : '0');

  // encode the status code
  sReturn = sReturn.replaceAt(nReturnPos++, '0');
  sReturn = sReturn.replaceAt(nReturnPos++, 'F');
  sReturn = sReturn.replaceAt(nReturnPos++, 'F');
  sReturn = sReturn.replaceAt(nReturnPos++, bStatus ? 'F' : '0');
  return sReturn;
}

function getTriState(codeword) {
  var code = 0;
  for(var i=0; i<codeword.length; i++) {
    var p = codeword.charAt(i);
    code <<= 2;
    switch (p) {
      case '0':
        // bit pattern 00
        break;
      case 'F':
        // bit pattern 01
        code |= 1;
        break;
      case '1':
        // bit pattern 11
        code |= 3;
        break;
    }
  }
  return code;
}

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}
