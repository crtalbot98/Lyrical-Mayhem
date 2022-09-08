import React from 'react';

const SelectedPlayList: React.FC<{playlist: SpotifyApi.PlaylistObjectFull, reset: Function}> = ({ playlist, reset }) => {
		return <div 
			className={'flex lg:flex-col items-end space-y-2'}
		>
			<button 
				className='self-start h-12 w-12 absolute'
				onClick={() => { reset() }}
			>
				<img 
					className='text-lightText lg:hidden' 
					src='./arrow-narrow-left.svg' 
					alt="Return to playlist" 
					width="24" 
					height="24"
				/>
			</button>
			<img 
				className='rounded-sm max-h-48 shadow-lg' 
				src={playlist.images[0].url} alt={`${playlist.name} image`} 
			/>
			<p className='text-lightText text-4xl'>
				{playlist.name}
			</p>
		</div>
}

export default SelectedPlayList