async function loadData() {
    try {
      const response = await fetch('data.json');
      const data = await response.json();
      
      return data; 
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }
  

  loadData().then(data => {
    console.log('Datos cargados:', data);
  });
  