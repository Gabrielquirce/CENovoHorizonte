import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AboutUsScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Centro Educacional Novo Horizonte</Text>
      </View>

      {/* Missão */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nossa Missão</Text>
        <View style={styles.missionContainer}>
          <Text style={styles.text}>
            Proporcionar um ambiente motivador para que as potencialidades de cada indivíduo sejam expressadas,
            adquirindo conhecimentos únicos e novas vivências de acordo com o dia a dia nas salas de aula.
          </Text>
          <Image
            source={require('../assets/images/profGenerica.jpg')}
            style={styles.missionImage}
          />
        </View>
      </View>

      {/* Citação da Diretora */}
      <View style={[styles.section, styles.directorSection]}>
        <Text style={styles.quote}>
          "A instituição planeja estrategicamente para o ano letivo projetos inovadores e multidisciplinares
          para estimular o ensino-aprendizado e promover relações interpessoais."
        </Text>
        <Image
          source={require('../assets/images/diretora.png')}
          style={styles.directorImage}
        />
        <Text style={styles.directorName}>Vanessa Lima</Text>
        <Text style={styles.directorTitle}>Diretora</Text>
      </View>

      {/* Segmentos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nossos Segmentos</Text>

        <View style={styles.segmentCard}>
          <Image
            source={require('../assets/images/ensinoInfantil.jpg')}
            style={styles.segmentImage}
          />
          <Text style={styles.segmentTitle}>Educação Infantil</Text>
          <Text style={styles.segmentText}>
            Desenvolvimento inicial com foco em brincadeiras e aprendizado, estimulando criatividade e socialização.
          </Text>
        </View>

        <View style={styles.segmentCard}>
          <Image
            source={require('../assets/images/fundamental.jpg')}
            style={styles.segmentImage}
          />
          <Text style={styles.segmentTitle}>Ensino Fundamental I</Text>
          <Text style={styles.segmentText}>
            Exploração do universo das letras e números, com aventuras nas operações matemáticas básicas.
          </Text>
        </View>

        <View style={styles.segmentCard}>
          <Image
            source={require('../assets/images/fundamental2.jpg')}
            style={styles.segmentImage}
          />
          <Text style={styles.segmentTitle}>Ensino Fundamental II</Text>
          <Text style={styles.segmentText}>
            Estímulo ao crescimento intelectual com abordagem interdisciplinar e multidisciplinar.
          </Text>
        </View>
      </View>

      {/* Atividades */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Atividades Extras</Text>

        <View style={styles.activityCard}>
          <Image
            source={require('../assets/images/ballet.png')}
            style={styles.activityImage}
          />
          <View style={styles.activityTextContainer}>
            <Text style={styles.activityTitle}>Ballet</Text>
            <Text style={styles.activityText}>
              Trabalho de postura, equilíbrio e coordenação em um ambiente acolhedor e divertido.
            </Text>
          </View>
        </View>

        <View style={styles.activityCard}>
          <Image
            source={require('../assets/images/computadores.png')}
            style={styles.activityImage}
          />
          <View style={styles.activityTextContainer}>
            <Text style={styles.activityTitle}>Informática</Text>
            <Text style={styles.activityText}>
              Desenvolvimento do pensamento lógico e uso responsável da tecnologia.
            </Text>
          </View>
        </View>
                {/* Capoeira */}
                <View style={styles.activityCard}>
                  <Image
                    source={require('../assets/images/capoeira.png')}
                    style={styles.activityImage}
                  />
                  <View style={styles.activityTextContainer}>
                    <Text style={styles.activityTitle}>Capoeira</Text>
                    <Text style={styles.activityText}>
                      Aula dinâmica que une arte marcial, música e cultura brasileira, promovendo disciplina e coordenação motora.
                    </Text>
                  </View>
                </View>
                {/* Jiu-Jítsu */}
                <View style={styles.activityCard}>
                  <Image
                    source={require('../assets/images/jiujitsu.png')}
                    style={styles.activityImage}
                  />
                  <View style={styles.activityTextContainer}>
                    <Text style={styles.activityTitle}>Jiu-Jítsu</Text>
                    <Text style={styles.activityText}>
                      Desenvolve autoconfiança, respeito e técnicas de defesa pessoal em ambiente seguro e supervisionado.
                    </Text>
                  </View>
                </View>
                {/* Educação Física */}
                <View style={styles.activityCard}>
                  <Image
                    source={require('../assets/images/EF.png')}
                    style={styles.activityImage}
                  />
                  <View style={styles.activityTextContainer}>
                    <Text style={styles.activityTitle}>Educação Física</Text>
                    <Text style={styles.activityText}>
                      Promoção de hábitos saudáveis através de esportes e atividades físicas diversificadas.
                    </Text>
                  </View>
                </View>
              </View>
      {/* Rodapé */}
      <View style={styles.footer}>
        <View style={styles.contactContainer}>
          <FontAwesome name="phone" size={20} color="white" />
          <Text style={styles.contactText}>(00) 1234-5678</Text>
        </View>

        <View style={styles.socialIcons}>
          <FontAwesome name="facebook" size={24} color="white" style={styles.icon} />
          <FontAwesome name="instagram" size={24} color="white" style={styles.icon} />
        </View>
            <TouchableOpacity
              onPress={() => router.push('/home')}
            >
              <Text style={styles.voltarPagPrincipal}>Voltar</Text>
            </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#902121",
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.3)'
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)'
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  missionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  missionImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  text: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  directorSection: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
  },
  quote: {
    color: 'white',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
  },
  directorImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  directorName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  directorTitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
  segmentCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  segmentImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  segmentTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  segmentText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  activityImage: {
    width: 100,
    height: 100,
  },
  activityTextContainer: {
    flex: 1,
    padding: 10,
  },
  activityTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  activityText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  socialIcons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  icon: {
    marginHorizontal: 15,
  },
  voltarPagPrincipal: {
  color: "white",
  fontSize: 16,
  fontWeight: "600",
  marginTop: 20,
  textAlign : "center"
  },
});