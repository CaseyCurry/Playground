var nhWidgetPatientListViaHostedJs = {
  render: function(container) {
    container.id = "container";
    const scenic = document.createElement("li");
    scenic.innerHTML = "Scenic Drive";
    const main = document.createElement("li");
    main.innerHTML = "Main Street";
    const pearl = document.createElement("li");
    pearl.innerHTML = "Pearl Street";
    const list = document.createElement("ul");
    list.appendChild(scenic);
    list.appendChild(main);
    list.appendChild(pearl);
    container.appendChild(list);

    window.nhBrowserBus.default.listen({
      eventName: "patient-added",
      respond: function(event) {
        const patient = document.createElement("li");
        patient.innerHTML = event.message;
        list.appendChild(patient);
      }
    });
  },
  metadata: {
    title: "Patient List Via Hosted JS",
    defaultSize: {
      height: 2,
      width: 1
    }
  }
};