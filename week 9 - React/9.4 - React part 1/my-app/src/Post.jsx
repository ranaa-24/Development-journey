import React from 'react';

export default function Post({ name, pfp, postContent, followers }) {
    return (
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: 8, padding: 20, width: 320, minHeight: 150, borderRadius: "16px", backgroundColor: "#fff" }}>

            <div className="userProfile" style={{ display: "flex" }}>
                <img src={pfp} alt="post" style={{ height: 50, aspectRatio: 1, borderRadius: '50%', marginRight: 10 }} />

                <div>
                    <b style={{ fontSize: 18, }}>{name}</b>
                    <p style={{ fontSize: 16, marginTop: 2 }}>{`${followers} followers`}</p>
                </div>
            </div>

            <div className='content' style={{ fontSize: 20, textWrap: 'wrap' }}>
                {postContent}
            </div>

        </div>
    )
}