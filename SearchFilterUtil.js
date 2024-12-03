class SearchFilterUtil {
  static max_score = {
    predef_val: 100,
    name: 45,
    cust_num: 10,
    cust_num_with_unit: 25,
    cust_string: 5
  };
  static find_matches(searchVal, cri_list) {
    let search_results = [];
   
      cri_list.forEach(item => {
        let result = this.find_match(searchVal, item);
        if (result.score > 0) {
          //the results are sorted by score at the time of insertion 
          let index = 0;
          while (index < search_results.length && search_results[index]["score"] >= result.score) {
            index++;
          }
          search_results.splice(index, 0, { "name": item.name, ...result, });
        }
      });
    
    
    return search_results;
  }

  
  static find_match(searchVal, criItem) {
    let result = {
      score: 0,
      match_found_in: "",
      match: {
        values: [],
        unit: ""
      },
    }
    result = this.find_value_matches(searchVal, criItem.values, criItem.search_conf, criItem.data_type);
    let name_score = this.find_name_score(searchVal, criItem.name);

    if (name_score > result.score) {
      result.score = name_score;
      result.match_found_in = "name";
    }
    return result;
  }

  static find_value_matches(searchVal, values, search_conf, data_type) {
    let result = {
      score: 0,
      match_found_in: "value",
      match: {
        values: [],
        unit: ""
      },
    }
    let value_patterns = search_conf.patternVsvalue;
    let unit_patterns = search_conf.patternVsunit;

    if (this.is_patternVsvalue_match(searchVal, value_patterns)) {
      let is_field_custom = (values.length === 0) ? true : false;
      if (is_field_custom) {
        if (data_type === "number") {
          if (this.cri_has_unit(unit_patterns)) {
            result.match = this.extract_valueUnit(searchVal, unit_patterns);
            if (result.match.values.length === 0) {
              result.score = this.max_score.cust_num_with_unit - this.max_score.cust_num;
            } else {
              result.score = result.match.values[0]["score"]
            }
          } else {
            result.match.values.push({ "value": searchVal, "_id": searchVal, "score": this.max_score.cust_num });
            result.score = this.max_score.cust_num;
          }
        } else {
          result.match.values.push({ "value": searchVal, "_id": searchVal, "score": this.max_score.cust_string });
          result.score = this.max_score.cust_string;
        }
      } else {
        result.match.values = this.find_matching_valuesArr(searchVal, values);
        result.score = (result.match.values.length > 0) ? result.match.values[0].score : 0;
      }
    }
    return result;
  }
  static find_matching_valuesArr(searchVal, values) {
    let match_scoreVsvalues = [];
    values.forEach(valueObj => {
      if (this.is_subString(searchVal, valueObj.value)) {
        let score = this.max_score.predef_val - valueObj.value.toLowerCase().indexOf(searchVal.toLowerCase());
        //the values are sorted by score at the time of insertion 
        let index = 0;
        while (index < match_scoreVsvalues.length && match_scoreVsvalues[index]["score"] >= score) {
          index++;
        }
        match_scoreVsvalues.splice(index, 0, { ...valueObj, "score": score });
      }
    });
    return match_scoreVsvalues;
  }

  static is_patternVsvalue_match(searchVal, patterns) {
    for (let i = 0; i < patterns.length; i++) {
      if (patterns[i].test(searchVal)) {
        return true;
      }
    }
    return false;
  }

  static cri_has_unit(patterns) {
    return (Object.keys(patterns).length > 0) ? true : false;
  }

  static extract_valueUnit(searchVal, unit_patterns) {
    let match = {
      values: [],
      unit: ""
    }
    for (const pattern in unit_patterns) {
      const escapedPattern = pattern.replaceAll("/", "");
      const regex = new RegExp(escapedPattern);
      if (regex.test(searchVal)) {
        match.unit = unit_patterns[pattern];
      }
    }
    let hasNumRegex = /[0-9.]+/;
    const matches = searchVal.match(hasNumRegex);
    let score = this.max_score.cust_num;
    if (matches) {
      const numberValue = Number(matches[0]);
      if (match.unit === "") {
        score = this.max_score.cust_num - 1;
      } else {
        score = this.max_score.cust_num_with_unit;
      }
      match.values.push({ "value": numberValue, "_id": numberValue, score: score });
    }
    return match;
  }

  static find_name_score(searchVal, cri_name) {
    searchVal = searchVal.toLowerCase();
    cri_name = cri_name.toLowerCase();
    if (this.is_subString(searchVal, cri_name)) {
      return this.max_score.name - cri_name.indexOf(searchVal);
    } else {
      return 0;
    }
  }
  static is_subString(subString, string) {
    return ((string.toLowerCase().indexOf(subString.toLowerCase()) === -1) ? false : true);
  }
}
// let searchVal = prompt("Enter input : ");
// let cri_data = [
//   {
//     "name": "Event name",
//     "values": [
//       { "value": "AGENT_DATA_ISSUES", "_id": "AGENT_DATA_ISSUES" },
//       { "value": "AGENT_LOG_SUPPRESSED", "_id": "AGENT_LOG_SUPPRESSED" },
//       { "value": "AGENT_PROVISIONING_ERROR", "_id": "AGENT_PROVISIONING_ERROR" },
//       { "value": "AMD_ERRATUM_1474_ISSUE", "_id": "AMD_ERRATUM_1474_ISSUE" },
//       { "value": "APPGROUP_COMPONENTS_UNDER_SAME_RACK", "_id": "APPGROUP_COMPONENTS_UNDER_SAME_RACK" },
//       { "value": "APP_PARAM_THRESHOLD_EXCEEDED", "_id": "APP_PARAM_THRESHOLD_EXCEEDED" },
//       { "value": "ARANGODB_REPLICATION_ISSUES", "_id": "ARANGODB_REPLICATION_ISSUES" },
//       { "value": "BACKUP_HSM_CONNECTIVITY_ISSUE", "_id": "BACKUP_HSM_CONNECTIVITY_ISSUE" },
//       { "value": "BACKUP_HSM_CONNECTIVITY_ISSUES", "_id": "BACKUP_HSM_CONNECTIVITY_ISSUES" },
//       { "value": "BDAAS_CONSUMER_LAG", "_id": "BDAAS_CONSUMER_LAG" },
//       { "value": "BDAAS_DB_CONSUMER_LAG", "_id": "BDAAS_DB_CONSUMER_LAG" },
//       { "value": "BDAAS_DB_PRODUCER_LAG", "_id": "BDAAS_DB_PRODUCER_LAG" },
//       { "value": "BDAAS_PRODUCER_LAG", "_id": "BDAAS_PRODUCER_LAG" },
//       { "value": "BOND_NOT_CONFIGURED", "_id": "BOND_NOT_CONFIGURED" },
//       { "value": "BOTH_IFC_IN_DIFF_VLANS", "_id": "BOTH_IFC_IN_DIFF_VLANS" },
//       { "value": "BOTH_IFC_IN_SAME_SWITCH", "_id": "BOTH_IFC_IN_SAME_SWITCH" },
//       { "value": "CERTIFICATE_EXPIRY", "_id": "CERTIFICATE_EXPIRY" },
//       { "value": "CERTIFICATE_EXPIRY_ALERT", "_id": "CERTIFICATE_EXPIRY_ALERT" },
//       { "value": "CIDR_MISMATCH", "_id": "CIDR_MISMATCH" },
//       { "value": "CLUSTER_IP_DUPLICATED", "_id": "CLUSTER_IP_DUPLICATED" },
//       { "value": "CLUSTER_IP_NOT_REACHABLE", "_id": "CLUSTER_IP_NOT_REACHABLE" },
//       { "value": "CLUSTER_IP_PACKET_LOSS", "_id": "CLUSTER_IP_PACKET_LOSS" },
//       { "value": "CMOS_BATTERY_ERROR", "_id": "CMOS_BATTERY_ERROR" },
//       { "value": "COMPLETE_POWER_FAILURE_EVENT", "_id": "COMPLETE_POWER_FAILURE_EVENT" },
//       { "value": "CONTAINER_HIGH_MEMORY", "_id": "CONTAINER_HIGH_MEMORY" },
//       { "value": "CONTAINER_MACHINE_NOT_REACHABLE", "_id": "CONTAINER_MACHINE_NOT_REACHABLE" },
//       { "value": "CONTAINER_MACHINE_REBOOTED", "_id": "CONTAINER_MACHINE_REBOOTED" },
//       { "value": "CPU_CORE_IOWAIT", "_id": "CPU_CORE_IOWAIT" },
//       { "value": "CPU_CRITICAL_USAGE", "_id": "CPU_CRITICAL_USAGE" },
//       { "value": "CPU_HIGH_IOWAIT", "_id": "CPU_HIGH_IOWAIT" },
//       { "value": "CROSS_DC_CALLS", "_id": "CROSS_DC_CALLS" },
//       { "value": "CROSS_DC_CSTORE_CALLS", "_id": "CROSS_DC_CSTORE_CALLS" },
//       { "value": "CROSS_DC_KAFKA_CALLS", "_id": "CROSS_DC_KAFKA_CALLS" },
//       { "value": "CROSS_DC_PRESTO_CALLS", "_id": "CROSS_DC_PRESTO_CALLS" },
//       { "value": "DB_AUDIT_LOG_RETRIEVAL_FAILED", "_id": "DB_AUDIT_LOG_RETRIEVAL_FAILED" },
//       { "value": "DB_AUDIT_LOG_RETRIEVAL_FAILED_MAINTENANCE", "_id": "DB_AUDIT_LOG_RETRIEVAL_FAILED_MAINTENANCE" },
//       { "value": "DB_AUDIT_LOG_RETRIEVAL_SUCCESS", "_id": "DB_AUDIT_LOG_RETRIEVAL_SUCCESS" },
//       { "value": "DB_AUDIT_LOG_RETRIEVAL_SUCCESS_MAINTENANCE", "_id": "DB_AUDIT_LOG_RETRIEVAL_SUCCESS_MAINTENANCE" },
//       { "value": "DB_DATA_ARCHIVAL", "_id": "DB_DATA_ARCHIVAL" },
//       { "value": "DB_DATA_IMPORT_FAILED", "_id": "DB_DATA_IMPORT_FAILED" },
//       { "value": "DB_DATA_IMPORT_SUCCESS", "_id": "DB_DATA_IMPORT_SUCCESS" },
//       { "value": "DB_DEDUPLICATION_FAILED", "_id": "DB_DEDUPLICATION_FAILED" },
//       { "value": "DB_DEDUPLICATION_SUCCESS", "_id": "DB_DEDUPLICATION_SUCCESS" },
//       { "value": "DB_ENDPOINT_NOT_REACHABLE", "_id": "DB_ENDPOINT_NOT_REACHABLE" },
//       { "value": "DB_NODE_NOT_REACHABLE", "_id": "DB_NODE_NOT_REACHABLE" },
//       { "value": "DB_OPERATION_FAILED", "_id": "DB_OPERATION_FAILED" },
//       { "value": "DB_OPERATION_SUCCESS", "_id": "DB_OPERATION_SUCCESS" },
//       { "value": "DB_REBALANCING_STATUS", "_id": "DB_REBALANCING_STATUS" },
//       { "value": "DB_RESTORE_FAILED", "_id": "DB_RESTORE_FAILED" },
//       { "value": "DB_RESTORE_SUCCESS", "_id": "DB_RESTORE_SUCCESS" },
//       { "value": "DB_SCALING_STATUS", "_id": "DB_SCALING_STATUS" },
//       { "value": "DB_BACKUP_COMPLETED", "_id": "DB_BACKUP_COMPLETED" },
//       { "value": "DB_BACKUP_FAILED", "_id": "DB_BACKUP_FAILED" },
//       { "value": "DB_BACKUP_IN_PROGRESS", "_id": "DB_BACKUP_IN_PROGRESS" },
//       { "value": "DB_BACKUP_RETRIEVAL_FAILED", "_id": "DB_BACKUP_RETRIEVAL_FAILED" },
//       { "value": "DB_BACKUP_RETRIEVAL_SUCCESS", "_id": "DB_BACKUP_RETRIEVAL_SUCCESS" },
//       { "value": "DB_BACKUP_RETRIEVAL_IN_PROGRESS", "_id": "DB_BACKUP_RETRIEVAL_IN_PROGRESS" },
//       { "value": "DISK_ABOVE_THRESHOLD", "_id": "DISK_ABOVE_THRESHOLD" },
//       { "value": "DISK_IO_ERROR", "_id": "DISK_IO_ERROR" },
//       { "value": "DISK_UNAVAILABLE", "_id": "DISK_UNAVAILABLE" },
//       { "value": "EBS_VOLUME_NOT_FOUND", "_id": "EBS_VOLUME_NOT_FOUND" },
//       { "value": "EBS_VOLUME_PERFORMANCE", "_id": "EBS_VOLUME_PERFORMANCE" },
//       { "value": "EC2_INSTANCE_NOT_FOUND", "_id": "EC2_INSTANCE_NOT_FOUND" },
//       { "value": "EC2_INSTANCE_PERFORMANCE", "_id": "EC2_INSTANCE_PERFORMANCE" },
//       { "value": "EC2_INSTANCE_STOPPED", "_id": "EC2_INSTANCE_STOPPED" },
//       { "value": "EC2_INSTANCE_TERMINATED", "_id": "EC2_INSTANCE_TERMINATED" },
//       { "value": "ENCRYPTION_ISSUES", "_id": "ENCRYPTION_ISSUES" },
//       { "value": "EVENT_HISTORY_RETRIEVAL_FAILED", "_id": "EVENT_HISTORY_RETRIEVAL_FAILED" },
//       { "value": "EVENT_HISTORY_RETRIEVAL_SUCCESS", "_id": "EVENT_HISTORY_RETRIEVAL_SUCCESS" },
//       { "value": "EXTERNAL_API_CALL_FAILURE", "_id": "EXTERNAL_API_CALL_FAILURE" },
//       { "value": "FIREWALL_RULE_VIOLATION", "_id": "FIREWALL_RULE_VIOLATION" },
//       { "value": "FLAPPING_NETWORK", "_id": "FLAPPING_NETWORK" },
//       { "value": "FLAPPING_NETWORK_DETECTION", "_id": "FLAPPING_NETWORK_DETECTION" },
//       { "value": "HIGH_LATENCY_EVENT", "_id": "HIGH_LATENCY_EVENT" },
//       { "value": "HTTP_SERVER_ERROR", "_id": "HTTP_SERVER_ERROR" },
//       { "value": "HYPERVISOR_UNAVAILABLE", "_id": "HYPERVISOR_UNAVAILABLE" },
//       { "value": "IMAGE_NOT_FOUND", "_id": "IMAGE_NOT_FOUND" },
//       { "value": "INACTIVE_NODES", "_id": "INACTIVE_NODES" },
//       { "value": "IP_VLAN_MISMATCH", "_id": "IP_VLAN_MISMATCH" },
//       { "value": "IP_VLAN_MISMATCH_VRF", "_id": "IP_VLAN_MISMATCH_VRF" },
//       { "value": "KAFKA_CONNECTIVITY_ISSUES", "_id": "KAFKA_CONNECTIVITY_ISSUES" },
//       { "value": "KAFKA_PRODUCER_FAILURE", "_id": "KAFKA_PRODUCER_FAILURE" },
//       { "value": "KAFKA_REPLICATION_FAILURE", "_id": "KAFKA_REPLICATION_FAILURE" },
//       { "value": "KAFKA_REPLICATION_STATUS", "_id": "KAFKA_REPLICATION_STATUS" },
//       { "value": "KAFKA_STREAM_RESTARTED", "_id": "KAFKA_STREAM_RESTARTED" }
//     ],
//     "conditions": ["contains", "not contains"],
//     "units": {
//       "list": [],
//       "listOrder": ""
//     },
//     "search_conf": {
//       "patternVsvalue": [/^[a-zA-Z0-9_]+$/],
//       "patternVsunit": {}
//     },
//     "validator": /^[A-Z0-9]+(_[A-Z0-9]+)*$/,
//     "data_type": "string",
//     "default": {
//       "condition": "contains",
//       "value": "",
//       "unit": "",
//     }
//   },
//   {
//     "name": "Event Assigned to",
//     "values": [],
//     "conditions": ["contains", "not contains"],
//     "units": {
//       "list": [],
//       "listOrder": ""
//     },
//     "search_conf": {
//       "patternVsvalue": [/^[a-zA-Z@.]+$/],
//       "patternVsunit": {}
//     },
//     "validator": "/^[a-zA-Z]+(.[a-zA-Z]+)*@zohocorp.com$/",
//     "data_type": "string",
//     "default": {
//       "condition": "contains",
//       "value": "",
//       "unit": ""
//     }
//   },
//   {
//     "name": "Service",
//     "values": [
//       { "value": "0Trust", "_id": "0Trust" },
//       { "value": "Aalam", "_id": "Aalam" },
//       { "value": "Aalam-Csez", "_id": "Aalam-Csez" },
//       { "value": "Accio", "_id": "Accio" },
//       { "value": "Accounts", "_id": "Accounts" },
//       { "value": "Accounts-Csez", "_id": "Accounts-Csez" },
//       { "value": "Accounts-NewCsez", "_id": "Accounts-NewCsez" },
//       { "value": "Accounts-Sas", "_id": "Accounts-Sas" },
//       { "value": "AccountsART", "_id": "AccountsART" },
//       { "value": "AccountsOperations", "_id": "AccountsOperations" },
//       { "value": "ACME", "_id": "ACME" },
//       { "value": "AI-Stratus-Csez", "_id": "AI-Stratus-Csez" },
//       { "value": "AIDev", "_id": "AIDev" },
//       { "value": "Aiops", "_id": "Aiops" },
//       { "value": "AIStratus", "_id": "AIStratus" },
//       { "value": "AlarmCentral", "_id": "AlarmCentral" },
//       { "value": "Alm", "_id": "Alm" },
//       { "value": "Analytics-Csez", "_id": "Analytics-Csez" },
//       { "value": "APIGateway", "_id": "APIGateway" },
//       { "value": "Appcreator", "_id": "Appcreator" },
//       { "value": "Appsense", "_id": "Appsense" },
//       { "value": "Apptics-Csez", "_id": "Apptics-Csez" },
//       { "value": "Aran", "_id": "Aran" },
//       { "value": "Arattai", "_id": "Arattai" },
//       { "value": "Arattai-Csez", "_id": "Arattai-Csez" },
//       { "value": "Arm", "_id": "Arm" },
//       { "value": "Artifactory", "_id": "Artifactory" },
//       { "value": "Assets", "_id": "Assets" },
//       { "value": "Assist", "_id": "Assist" },
//       { "value": "Assist-csez", "_id": "Assist-csez" },
//       { "value": "AT-Module", "_id": "AT-Module" },
//       { "value": "Atom", "_id": "Atom" },
//       { "value": "AutoMater-Csez", "_id": "AutoMater-Csez" },
//       { "value": "Backstage", "_id": "Backstage" },
//       { "value": "Backstage-Csez", "_id": "Backstage-Csez" },
//       { "value": "Bala", "_id": "Bala" },
//       { "value": "BDaaSAdmin", "_id": "BDaaSAdmin" },
//       { "value": "BDaaSAdmin-Csez", "_id": "BDaaSAdmin-Csez" },
//       { "value": "Bfsi", "_id": "Bfsi" },
//       { "value": "Blockchain", "_id": "Blockchain" },
//       { "value": "Bluepencil", "_id": "Bluepencil" },
//       { "value": "Blueprint", "_id": "Blueprint" },
//       { "value": "Blueprint-Csez", "_id": "Blueprint-Csez" },
//       { "value": "Blueprintplus", "_id": "Blueprintplus" },
//       { "value": "Bonitas-Charmtracker", "_id": "Bonitas-Charmtracker" },
//       { "value": "Books", "_id": "Books" },
//       { "value": "Books-csez", "_id": "Books-csez" },
//       { "value": "Browser360", "_id": "Browser360" },
//       { "value": "Bugbounty", "_id": "Bugbounty" },
//       { "value": "bugtracker", "_id": "bugtracker" },
//       { "value": "C7-4-Test-L3", "_id": "C7-4-Test-L3" },
//       { "value": "C7L3Test", "_id": "C7L3Test" },
//       { "value": "CaaS", "_id": "CaaS" },
//       { "value": "Calendar", "_id": "Calendar" },
//       { "value": "Calendar-Csez", "_id": "Calendar-Csez" },
//       { "value": "Campaign", "_id": "Campaign" },
//       { "value": "Campaign-Csez", "_id": "Campaign-Csez" },
//       { "value": "Campaigns-Csez", "_id": "Campaigns-Csez" },
//       { "value": "Catalyst", "_id": "Catalyst" },
//       { "value": "Catalyst-Csez", "_id": "Catalyst-Csez" },
//       { "value": "Chaos", "_id": "Chaos" },
//       { "value": "Charm", "_id": "Charm" },
//       { "value": "CharmSandboxAccounts", "_id": "CharmSandboxAccounts" },
//       { "value": "chat", "_id": "chat" },
//       { "value": "Chat-Csez", "_id": "Chat-Csez" },
//       { "value": "Chat-EU", "_id": "Chat-EU" },
//       { "value": "Chat-Ozen", "_id": "Chat-Ozen" },
//       { "value": "Check", "_id": "Check" },
//       { "value": "Cia", "_id": "Cia" },
//       { "value": "Circuit", "_id": "Circuit" },
//       { "value": "Circuit-Csez", "_id": "Circuit-Csez" },
//       { "value": "Cirrus", "_id": "Cirrus" },
//       { "value": "Cirrus-Csez", "_id": "Cirrus-Csez" },
//       { "value": "Cloud", "_id": "Cloud" },
//       { "value": "Cloud-Csez", "_id": "Cloud-Csez" },
//       { "value": "Cloudbuild", "_id": "Cloudbuild" },
//       { "value": "CloudDB-Csez", "_id": "CloudDB-Csez" },
//       { "value": "Cloudsecurityplus", "_id": "Cloudsecurityplus" },
//       { "value": "cntest", "_id": "cntest" },
//       { "value": "Code", "_id": "Code" },
//       { "value": "Code-Csez", "_id": "Code-Csez" },
//       { "value": "Code-IN", "_id": "Code-IN" },
//       { "value": "CodeDCSwitch", "_id": "CodeDCSwitch" },
//       { "value": "Codemine", "_id": "Codemine" },
//       { "value": "CodeMine-Csez", "_id": "CodeMine-Csez" },
//       { "value": "CodeMine-Tester", "_id": "CodeMine-Tester" },
//       { "value": "CodeMine-Tester-Csez", "_id": "CodeMine-Tester-Csez" },
//       { "value": "Codesync", "_id": "Codesync" },
//       { "value": "CODEVLAN", "_id": "CODEVLAN" },
//       { "value": "CommandCenter", "_id": "CommandCenter" },
//       { "value": "CommandCenter-Csez", "_id": "CommandCenter-Csez" },
//       { "value": "common", "_id": "common" },
//       { "value": "Common-Memcache", "_id": "Common-Memcache" },
//       { "value": "Community", "_id": "Community" },
//       { "value": "Comply", "_id": "Comply" },
//       { "value": "Components", "_id": "Components" },
//       { "value": "Connect", "_id": "Connect" },
//       { "value": "Connect-Llvm", "_id": "Connect-Llvm" },
//       { "value": "Contactmanager", "_id": "Contactmanager" },
//       { "value": "Contacts", "_id": "Contacts" },
//       { "value": "Contacts-Csez", "_id": "Contacts-Csez" },
//       { "value": "Contactslab", "_id": "Contactslab" },
//       { "value": "Contactslab-Csez", "_id": "Contactslab-Csez" },
//       { "value": "Contracts", "_id": "Contracts" },
//       { "value": "Contracts-Dev", "_id": "Contracts-Dev" },
//       { "value": "Cpps", "_id": "Cpps" },
//       { "value": "Creator", "_id": "Creator" },
//       { "value": "Creator-csez", "_id": "Creator-csez" },
//       { "value": "Creatorplus", "_id": "Creatorplus" },
//       { "value": "crm", "_id": "crm" },
//       { "value": "Crm-csez", "_id": "Crm-csez" },
//       { "value": "CrmImap", "_id": "CrmImap" },
//       { "value": "CrmLocalBaihui", "_id": "CrmLocalBaihui" },
//       { "value": "CrmOne", "_id": "CrmOne" },
//       { "value": "crmplatform", "_id": "crmplatform" },
//       { "value": "Crmplus", "_id": "Crmplus" },
//       { "value": "Crmpremium", "_id": "Crmpremium" },
//       { "value": "Crmrelease", "_id": "Crmrelease" },
//       { "value": "Crmswitch", "_id": "Crmswitch" },
//       { "value": "Cstore", "_id": "Cstore" },
//       { "value": "Custom", "_id": "Custom" },
//       { "value": "Cybersecurity", "_id": "Cybersecurity" },
//       { "value": "D7-4-Backup-Old-Tools", "_id": "D7-4-Backup-Old-Tools" },
//       { "value": "D8", "_id": "D8" },
//       { "value": "DataLair", "_id": "DataLair" },
//       { "value": "Datastore-Csez", "_id": "Datastore-Csez" },
//       { "value": "DB-Service", "_id": "DB-Service" },
//       { "value": "DCAP-Preview", "_id": "DCAP-Preview" },
//       { "value": "Dcp", "_id": "Dcp" },
//       { "value": "Decision-Maker", "_id": "Decision-Maker" },
//       { "value": "Defect", "_id": "Defect" },
//       { "value": "Defect-Csez", "_id": "Defect-Csez" },
//       { "value": "Defect-Development", "_id": "Defect-Development" }
//     ],
//     "conditions": ["contains", "not contains"],
//     "units": {
//       "list": [],
//       "listOrder": ""
//     },
//     "search_conf": {
//       "patternVsvalue": [/^[a-zA-Z0-9-_]+$/],
//       "patternVsunit": {}
//     },
//     "validator": /^[a-zA-Z0-9-_]+$/,
//     "data_type": "string",
//     "default": {
//       "condition": "contains",
//       "value": "",
//       "unit": ""
//     }
//   },
//   {
//     "name": "Role",
//     "values": [
//       { "value": "0trust", "_id": "0trust" },
//       { "value": "10kasi", "_id": "10kasi" },
//       { "value": "aalam", "_id": "aalam" },
//       { "value": "aalam-csez", "_id": "aalam-csez" },
//       { "value": "ABM", "_id": "ABM" },
//       { "value": "accio", "_id": "accio" },
//       { "value": "Accountant", "_id": "Accountant" },
//       { "value": "accounts", "_id": "accounts" },
//       { "value": "accounts_dev", "_id": "accounts_dev" },
//       { "value": "Additional Slave", "_id": "Additional Slave" },
//       { "value": "Admin", "_id": "Admin" },
//       { "value": "adminpanel", "_id": "adminpanel" },
//       { "value": "afaccounts", "_id": "afaccounts" },
//       { "value": "AI", "_id": "AI" },
//       { "value": "aiops", "_id": "aiops" },
//       { "value": "AlarmProcess", "_id": "AlarmProcess" },
//       { "value": "AlarmsOneMobileApp", "_id": "AlarmsOneMobileApp" },
//       { "value": "alarmsoneSync", "_id": "alarmsoneSync" },
//       { "value": "alerts_s1", "_id": "alerts_s1" },
//       { "value": "alpha", "_id": "alpha" },
//       { "value": "alpha1", "_id": "alpha1" },
//       { "value": "AlphaStore", "_id": "AlphaStore" },
//       { "value": "AlphaStorefront", "_id": "AlphaStorefront" },
//       { "value": "amw", "_id": "amw" },
//       { "value": "analyser", "_id": "analyser" },
//       { "value": "Analytics", "_id": "Analytics" },
//       { "value": "analytics-cc", "_id": "analytics-cc" },
//       { "value": "analytics-insights", "_id": "analytics-insights" },
//       { "value": "analytics-snapshot", "_id": "analytics-snapshot" },
//       { "value": "analyticsclient-review", "_id": "analyticsclient-review" },
//       { "value": "analyticsnlp", "_id": "analyticsnlp" },
//       { "value": "analyticssubgrid-export", "_id": "analyticssubgrid-export" },
//       { "value": "Analyzer", "_id": "Analyzer" },
//       { "value": "angular", "_id": "angular" },
//       { "value": "anomaly", "_id": "anomaly" },
//       { "value": "anomaly2", "_id": "anomaly2" },
//       { "value": "antifraud", "_id": "antifraud" },
//       { "value": "aoc", "_id": "aoc" },
//       { "value": "APDEV1", "_id": "APDEV1" },
//       { "value": "APDEV2", "_id": "APDEV2" },
//       { "value": "APDEV3", "_id": "APDEV3" },
//       { "value": "Api", "_id": "Api" },
//       { "value": "Apiauto", "_id": "Apiauto" },
//       { "value": "apidevlocal", "_id": "apidevlocal" },
//       { "value": "apidocs", "_id": "apidocs" },
//       { "value": "ApiGateway", "_id": "ApiGateway" },
//       { "value": "aplus-export", "_id": "aplus-export" },
//       { "value": "APLUSQA", "_id": "APLUSQA" },
//       { "value": "applog", "_id": "applog" },
//       { "value": "applog_client", "_id": "applog_client" },
//       { "value": "applog_plus", "_id": "applog_plus" },
//       { "value": "appproxy", "_id": "appproxy" },
//       { "value": "appsense", "_id": "appsense" },
//       { "value": "appsenseagent", "_id": "appsenseagent" },
//       { "value": "AppServer", "_id": "AppServer" },
//       { "value": "apptics-web", "_id": "apptics-web" },
//       { "value": "apptics_dev1", "_id": "apptics_dev1" },
//       { "value": "apptics_qa", "_id": "apptics_qa" },
//       { "value": "arattai", "_id": "arattai" },
//       { "value": "arattai-profile", "_id": "arattai-profile" },
//       { "value": "arattaiav", "_id": "arattaiav" },
//       { "value": "Archiving", "_id": "Archiving" },
//       { "value": "arm", "_id": "arm" },
//       { "value": "Art", "_id": "Art" },
//       { "value": "artifactory", "_id": "artifactory" },
//       { "value": "askzia", "_id": "askzia" },
//       { "value": "asmclient", "_id": "asmclient" },
//       { "value": "Aspportal", "_id": "Aspportal" },
//       { "value": "assist-agent", "_id": "assist-agent" },
//       { "value": "assist-dccloud", "_id": "assist-dccloud" },
//       { "value": "assist-dccsez", "_id": "assist-dccsez" },
//       { "value": "assist-dev", "_id": "assist-dev" },
//       { "value": "assist-mobile1", "_id": "assist-mobile1" },
//       { "value": "assist-mobile2", "_id": "assist-mobile2" },
//       { "value": "assist-mobile3", "_id": "assist-mobile3" },
//       { "value": "assist-monitor", "_id": "assist-monitor" },
//       { "value": "assist-qa", "_id": "assist-qa" },
//       { "value": "assist-qa2", "_id": "assist-qa2" },
//       { "value": "assist-record", "_id": "assist-record" },
//       { "value": "assist-sac", "_id": "assist-sac" },
//       { "value": "assist-scale", "_id": "assist-scale" },
//       { "value": "assist-scale1", "_id": "assist-scale1" },
//       { "value": "assist-security", "_id": "assist-security" },
//     ],
//     "conditions": ["contains", "not contains"],
//     "units": {
//       "list": [],
//       "listOrder": ""
//     },
//     "search_conf": {
//       "patternVsvalue": [/^[a-zA-Z0-9-_]+$/],
//       "patternVsunit": {}
//     },
//     "validator": /^[a-zA-Z0-9-_]+$/,
//     "data_type": "string",
//     "default": {
//       "condition": "contains",
//       "value": "",
//       "unit": ""
//     }
//   },
//   {
//     "name": "IP",
//     "values": [],
//     "conditions": ["contains", "not contains"],
//     "units": {
//       "list": [],
//       "listOrder": ""
//     },
//     "search_conf": {
//       "patternVsvalue": [/^[0-9]+\.[0-9]+(\.[0-9]+)*$/],
//       "patternVsunit": {}
//     },
//     "validator": "/^[0-9]+(.[0-9]+)*$/",
//     "data_type": "string",
//     "default": {
//       "condition": "contains",
//       "value": "",
//       "unit": ""
//     }
//   },
//   {
//     "name": "Max CPU Speed",
//     "values": [],
//     "conditions": ["less than", "greater than", "in range"],
//     "units": {
//       "list": ["MHz", "GHz"],
//       "listOrder": "asc"
//     },
//     "search_conf": {
//       "patternVsvalue": [/^[0-9]+$/, /^[0-9]*(\s)*(((giga(\s*hertz)?)|(GH|Gh|gh)(z|Z)*)|((mega(\s*hertz)?)|(MH|Mh|mh)(z|Z)*)|[gGmM])+$/],
//       "patternVsunit": {
//         "/((giga(\s*hertz)?)|(GH|Gh|gh)(z|Z)*)|[gG]/": "GHz",
//         "/((mega(\s*hertz)?)|(MH|Mh|mh)(z|Z)*)|[mM]/": "MHz",
//       }
//     },
//     "validator": /^[0-9]+[ a-zA-z]*$/,
//     "data_type": "number",
//     "default": {
//       "condition": "less than",
//       "value": 0,
//       "unit": "MHz"
//     }
//   },
//   {
//     "name": "No. of Disks",
//     "values": [],
//     "conditions": ["less than", "greater than", "in range"],
//     "units": {
//       "list": [],
//       "listOrder": ""
//     },
//     "search_conf": {
//       "patternVsvalue": [/^[0-9]+$/],
//       "patternVsunit": {}
//     },
//     "validator": /^[0-9]+$/,
//     "data_type": "number",
//     "default": {
//       "condition": "less than",
//       "value": 0,
//       "unit": ""
//     }
//   },
// ]
// let res = SearchFilterUtil.find_matches(searchVal, cri_data);
// console.log(res);

//OUTPUT FORMAT:
// var search_res = [
//   {
//     name: "Role",
//     score: 100,
//     match_found_in: "value",
//     match: {
//       values: [
//         {
//           value: "10kasi",
//           _id: "10kasi",
//           score: 100
//         },
//         {
//           value: "alpha1",
//           _id: "alpha1",
//           score: 95
//         },
//         {
//           value: "APDEV1",
//           _id: "APDEV1",
//           score: 95
//         },
//         {
//           value: "alerts_s1",
//           _id: "alerts_s1",
//           score: 92
//         },
//         {
//           value: "apptics_dev1",
//           _id: "apptics_dev1",
//           score: 89
//         },

//         {
//           value: "assist-scale1",
//           _id: "assist-scale1",
//           score: 88
//         }
//       ],
//       unit: ""
//     }
//   },
//   {
//     name: "Event name",
//     score: 88,
//     match_found_in: "value",
//     match: {
//       values: [
//         {
//           value: "AMD_ERRATUM_1474_ISSUE",
//           _id: "AMD_ERRATUM_1474_ISSUE",
//           score: 88
//         }
//       ],
//       unit: ""
//     }
//   },
//   {
//     name: "No. of Disks",
//     score: 10,
//     match_found_in: "value",
//     match: {
//       values: [
//         {
//           value: "1",
//           _id: "1",
//           score: 10
//         }
//       ],
//       unit: ""
//     }
//   },
//   {
//     name: "Max CPU Speed",
//     score: 9,
//     match_found_in: "value",
//     match: {
//       values: [
//         {
//           value: "1",
//           _id: "1",
//           score: 10
//         }
//       ],
//       unit: ""

//     }
//   }
// ]