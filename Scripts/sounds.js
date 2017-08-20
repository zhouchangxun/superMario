function SoundManager()
{
	this.soundNames = new Array( 'jump' , 'coin' , 'enemy_die' , 'grow' , 'hurt' , 'mushroom' , 'shell' , 'shoot' , 'lifeupgrade' );	//alle Soundnamen
	this.count = this.soundNames.length;
	this.sounds = new Array();				//hier kommen die Audiotags rein

	for(var i = 0; i < this.count; i++) 
	{
		var t = document.createElement('audio');

		var canPlayType = t.canPlayType("audio/ogg");
		if(canPlayType.match(/maybe|probably/i)) 
			t.src = 'audio/' + this.soundNames[i] + '.ogg';
		else
			t.src = 'audio/' + this.soundNames[i] + '.mp3';

		t.preload = 'auto';					//sofort alles laden
		this.sounds.push([t]);				//der Tag kommt in einem Array zu den sounds hinzu, weil u.U. noch mehrere Klone erzeugt werden m�ssen....
	}
};

SoundManager.prototype.play = function(name)	//spiele Sound 'name'
{
	for( var i = this.count ; i-- ; ) 		//suche Sound im SoundNames-Array
	{        
		if( this.soundNames[i] === name ) 	//richtiger Sound gefunden
		{
			var t = this.sounds[i];			//speichere richtiges Audioarray ab 

			for(var j = t.length; j--; ) 	//gehe durch Audioarray mit gew�nschtem Sound
			{                    
				if(t[j].duration === 0)
					return;

				if(t[j].ended)				//falls Audiotag schon am Ende ist, zur�cksetzen
					t[j].currentTime = 0;
				else if(t[j].currentTime > 0)	//falls Audiotag noch am Spielen ist, n�chsten Audiotag untersuchen
					continue;

				t[j].play();				//der Audiotag ist abspielbereit -> abspielen und Methode verlassen
				return;
			}

			//die bereits erzeugten Audiotags sind momentan alle belegt:
			var s = document.createElement('audio');	//erzeuge neuen Audiotag 
			s.src = t[0].src;				//mit dem gew�nschten Soundfile,
			t.push(s);						//f�ge ihn zum Array hinzu
			s.play();						//und spiele ihn ab
			return;
		}
	}
};
SoundManager.prototype.sideMusic = function(type){
  console.log('set GameMusic to [%s] .',type);
  var music = document.getElementById('GameMusic');	
  if(music) {
    music.src = 'audio/'+type+'.ogg';
		music.play();
    music.loop=(type == 'Overworld');
  }
}
