import React from 'react';
import { View, Text, Image } from 'react-native';
import { Header, Left, Button, Icon, Body, Title, Right, Fab } from 'native-base';
import { MapView } from 'expo';
import Meteor, { createContainer } from 'react-native-meteor';

var mapStyle =
  [
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "gamma": "0.42"
            },
            {
                "saturation": "100"
            },
            {
                "hue": "#0cff00"
            },
            {
                "lightness": "0"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#37bda2"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#37bda2"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#e4dfd9"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#37bda2"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#70b99b"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fafeb8"
            },
            {
                "weight": "1.25"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#5ddad6"
            }
        ]
    }
  ];

class PokeMap extends React.Component{
  state = {
      location: {
          latitude: 30.2672,
          longitude: -97.7431,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
      }
  }
  recordEvent = (x) =>{
    console.log(x);
    this.setState({location: x});
  }

  addPokemon = ()=>{
    Meteor.call('pokemon.add',this.state.location, (err,res)=>{
      console.log('add function', err,res);
    })
  }

  removePokemon = ()=>{
    if(this.props.pokemon.length === 0){
      return;
    }
    var remove = this.props.pokemon[0]._id;
    Meteor.call("pokemon.subtract", remove, (err,res)=>{
      console.log('remove function',err,res);
    })
  }

  renderPokemon = () =>{
    return this.props.pokemon.map(p=>{
        return(
          <MapView.Marker
              coordinate={{latitude: p.latitude, longitude: p.longitude}}
              key={p._id}
          >
            <Image source={{uri: "http://192.168.0.17:3000/"+p.image}}
            style={{height: 50, width: 50}}
            />
          </MapView.Marker>
        )
    })
  }
  logout = () =>{
      Meteor.logout();
      this.props.flipLogin(false);
  }

  render(){
    console.log(this.props.pokemon);
    return(
      <View style={{flex: 1}}>
          <Header>
              <Left>

              </Left>
              <Body>
                  <Title>PokeMap</Title>
              </Body>
              <Right>
                  <Button transparent onPress={this.logout}>
                      <Icon name="power"/>
                  </Button>
              </Right>
          </Header>
          <MapView
              style={{flex: 1}}
              initialRegion={this.state.location}
              provider={MapView.PROVIDER_GOOGLE}
              customMapStyle={mapStyle}
              onRegionChangeComplete={(x)=>this.recordEvent(x)}
          >
              {this.renderPokemon()}
          </MapView>
          <Fab
            direction="left"
            position="bottomRight"
            style={{backgroundColor: 'green'}}
            onPress={this.addPokemon}
            >
              <Icon name="add"/>
          </Fab>
          <Fab
              direction="right"
              position="bottomLeft"
              style={{backgroundColor: 'red'}}
              onPress={this.removePokemon}
          >
              <Icon name="remove"/>
          </Fab>
      </View>
    )
  }
}

export default createContainer(params=>{
    Meteor.subscribe('pokemon');

    return{
      pokemon: Meteor.collection('pokemon').find({})
    };
}, PokeMap);
