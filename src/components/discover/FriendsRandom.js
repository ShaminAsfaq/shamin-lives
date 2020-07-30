import React from 'react';
import addNotification, {Notifications} from 'react-push-notification';


const FriendsRandom = () => {

    let onButtonClicked = () => {
        let seasonToEpisodeMap = {
            '3': 25,
            '6': 25,
            '10': 18,
            'undefined': 24
        }

        let randomSeason = Math.ceil(Math.random() * 10);
        let randomEpisode;

        if (seasonToEpisodeMap[randomSeason.toString()] === undefined) {
            randomEpisode = seasonToEpisodeMap['undefined'];
        } else {
            randomEpisode = seasonToEpisodeMap[randomSeason];
        }

        randomEpisode = Math.ceil(Math.random() * randomEpisode);

        let episodeNumber = (randomSeason - 1) * 24;
        episodeNumber += randomEpisode;
        // console.log(randomSeason + '--------> ' + episodeNumber);

        if (randomSeason > 6) {
            episodeNumber += 2;
        } else if (randomSeason === 6) {
            episodeNumber += 1;
        } else if (randomSeason > 3) {
            episodeNumber += 1;
        }

        episodeNumber += 70273996;

        if (randomSeason === 9 && randomEpisode === 23) {
            episodeNumber = 80057887;
        }

        addNotification({
            title: 'F.R.I.E.N.D.S Random Episode',
            subtitle: `Episode number ${episodeNumber}`,
            message: `Season ${randomSeason} Episode ${randomEpisode}`,
            theme: 'red',
            native: false, // when using native, your OS will handle theming.
            icon: 'https://ae01.alicdn.com/kf/HTB1_WAoayYrK1Rjy0Fdq6ACvVXaa.jpg',
            duration: 10000
        });

        setTimeout(() => {
            window.open(`https://www.netflix.com/watch/${episodeNumber}`)
        }, 3000)
    }

    return (
        <div className="ui cards" style={{padding: '60px 5% 5% 5%'}}>
            <Notifications/>
            <div className="card">
                <div className="image">
                    <img src="https://ae01.alicdn.com/kf/HTB1_WAoayYrK1Rjy0Fdq6ACvVXaa.jpg"/>
                </div>
                <div className="content">
                    <div className="header">
                        F.R.I.E.N.D.S
                    </div>
                    <div className="meta">
                        <a>TV Show</a>
                    </div>
                    <div className="description">
                        American TV show ran successfully between 1994-2004
                    </div>
                </div>
                <div className="extra content">
                    <div className="ui basic green button"
                         style={{
                             display: 'block',
                             marginLeft: 'auto'
                         }}
                         onClick={onButtonClicked}
                    >
                        Play Random Episode
                    </div>
                </div>
            </div>
        </div>
    );
}

export {
    FriendsRandom as default
}


