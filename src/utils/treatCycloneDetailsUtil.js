function treatBasin(basin) {
  let resultBasin;
  switch (basin) {
    case 'AL':
      resultBasin = 'Oceano Atlântico';
      break;
    case 'EP':
      resultBasin = 'Oceano Pacífico leste';
      break;
    case 'CP':
      resultBasin = 'Oceano Pacífico central';
      break;
    case 'WP':
      resultBasin = 'Oceano Pacífico oeste';
      break;
    case 'IO':
      resultBasin = 'Oceano Índico';
      break;
    case 'SH':
      resultBasin = 'Hemisfério sul';
      break;
    case null:
      resultBasin = 'Tempestade não ativa';
      break;
    default:
      resultBasin = 'Erro';
      break;
  }

  return resultBasin;
}

function treatStormType(stormType) {
  let resultStormType;
  switch (stormType) {
    case 'TD':
      resultStormType = 'Depressão tropical';
      break;
    case 'TS':
      resultStormType = 'Tempestade tropical';
      break;
    case 'H':
      resultStormType = 'Furacão';
      break;
    case 'TY':
      resultStormType = 'Tufão';
      break;
    default:
      resultStormType = 'Erro';
  }

  return resultStormType;
}

module.exports = { treatBasin, treatStormType };
