import React from 'react';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import { Feather } from "@expo/vector-icons";
import style from "./detail.styles";
import logoImg from "../../assets/logo.png";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as mailComposer from "expo-mail-composer";
//
function Detail() {
  const navigation = useNavigation();
  const navigateToIncident = () => { navigation.goBack() };
  const route = useRoute();
  const incident = route.params.incident;
  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)}`;

  const sendMail = () => {
    mailComposer.composeAsync({
      subject: 'heroi do caso : Cadelinha atropelada',
      recipients: ['andrelp1015@gmail.com'],
      body: message,
    })
  };

  const sendWhatsApp = () => {
    Linking.openURL(`whatsapp://send?text=${message}&phone=+55${incident.whatsapp}`)
  }
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Image source={logoImg} />
        <TouchableOpacity
          onPress={navigateToIncident}
        >
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>
      </View>
      <View style={style.incident}>
        <Text style={[style.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={style.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

        <Text style={style.incidentProperty}>CASO:</Text>
        <Text style={style.incidentValue}>{incident.title}</Text>

        <Text style={style.incidentProperty}>Valor:</Text>
        <Text style={style.incidentValue}>
          {Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' })
            .format(incident.value)}
        </Text>
      </View>

      <View style={style.contactBox} >
        <Text style={style.heroTitle}>Salve o dia!</Text>
        <Text style={style.heroTitle}>Seja o herói desse caso.</Text>
        <Text style={style.heroDescription}>Entre em contato: </Text>
        <View style={style.actions}>
          <TouchableOpacity
            style={style.action}
            onPress={sendMail}
          >
            <Text style={style.actionText}>E-mail</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.action}
            onPress={sendWhatsApp}
          >
            <Text style={style.actionText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Detail;
